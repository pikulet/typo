---
title: Cyclical Transaction-based Replication
date: "2024-02-10"
showTags: true
slug: "cyclical-replication"
tags:
- "cloud infrastructure"
- "databases"
summary: "Synchronising two databases that are actively receiving non-sharded writes"
---

## Introduction

Most database clusters follow the one master multiple slaves architecture. Writes only happen to the master, while reads can happen between the master and slave.

However, a multi-master application can be beneficial in cases where we have partitioned writes to the database. This means that `id=1-10` are primarily written to by one group of functions, while `id=11-20` are written by another. Allowing multiple write sources is beneficial to improve performance. Another reason could be a large geographical separation in the write sources - having a write source in each continent would increase its local performance.

### Cyclical replication

In a multi-master scenario, `A` is listening to transactions from `B` and vice versa. Suppose that `A` executes a transaction (`tx`) and `B` copies this transaction from `A` (`tx_copy`). Now, because `A` is also listening to `B`, `A` will attempt to replicate the `tx_copy` transaction. `A` needs to be able to detect that `tx_copy` is a copied transaction.

![Cyclical replication loop between Node A and Node B](/media/replication-loop.svg)

## Binlog-based detection

We can let `A` detect this loop by having `B` insert a dummy statement in the transaction.

Initially, the structure of a transaction is like this:
- `BEGIN`
- `STMT`
- `COMMIT`

A dummy statement can be inserted. For instance, we might insert the dummy statement after `BEGIN` so that the pipeline can simply ignore all future messages.
- `BEGIN`
- `dummy` (inserted)
- `STMT`
- `COMMIT`

![Transaction structure before and after dummy statement injection](/media/replication-tx-structure.svg)

### UPDATE statement

The goal of the dummy statement is to generate binlog traffic without impacting the actual operations. We might want to save resources by opting to use a command like `UPDATE` instead of `INSERT`. 

In a high-concurrency setting, the updates cannot have the `WHERE` clause, because we do not know the previous value of the dummy column. The final statement might look like `UPDATE table SET dummy_col = x`. To ensure that there is real binlog traffic generated, the `x` value cannot be the same as the existing value of the column. 

In other words, if two transactions could occur concurrently, we need to ensure that the `x` value is always different. While we can keep track of a pool of possible `x` values, a transaction can use, we can also opt for a sequential addition. Overflows do not matter since by the time the `x` value cycles back to `1` (for unsigned int), the previous transaction would already have been replicated.

This solution works. While an update statement does not create significant load on the underlying database engine, it still causes a real transaction to be executed.

### Blackhole engine

Another alternative might be to consider using a blackhole (no-op) engine. When creating the table, add `engine = blackhole`.

However, upon testing, MySQL enforces a separate transaction on statements to blackhole tables. The transaction ends up being split up:

- `BEGIN`
- `dummy`
- `COMMIT`

- `BEGIN`
- `STMT`
- `COMMIT`

We now have two transactions, that need to be executed one after the other. However, this is not efficient in a high-concurrency setting. We would have to lock the other threads to ensure this sequence of events occurs. However, this solution is viable for a single-thread scenario.

### DROP VIEW IF EXISTS

An interesting alternative to the blackhole engine is to use `DROP VIEW IF EXISTS x`. It generates a binlog statement without having any real operation. This idea came from [openark/orchestrator](https://github.com/openark/orchestrator/blob/master/docs/configuration-discovery-pseudo-gtid.md) using `DROP VIEW` to inject GTIDs for engines without such support.

However, because `DROP VIEW` is a DDL (data definition language) event, it will also be put in a separate transaction like blackhole engine statements. As such, this method is also not viable for multi-thread settings.

## UUID-based detection

Binlog-based detection has its pitfalls, since it fundamentally generates additional network traffic. Another method is to use the GTID (Global Transaction ID) of a transaction to detect its source.

The GTID is of the format:
`<server_uuid>:<seq_no>`

When `A` executes a transaction to `B` (`tx`), `tx` will have a GTID like `uuid_A:1`. Upon receiving this transaction, `B` can detect that the `server_uuid` portion of the GTID is not its own. `B` will then replicate `tx` to get `tx_copy`.

### SET gtid_next
Since we're programmatically doing this replication, `B` is not actually in the same database cluster as `A`. `tx_copy` will have a GTID like `uuid_B:1`. When `A` receives this transaction, the behaviour is to (incorrectly) replicate it.

To solve this, we can use an operation like `set gtid_next` to overwrite `B`'s default transaction behaviour. Instead of writing to the binlog with `uuid_B:1`, B can execute `tx` with GTID `uuid_A:1`. 

When `A` receives this transaction and sees its own uuid, it can then ignore the transaction.

![GTID-based loop detection flow between Node A and Node B](/media/replication-gtid-flow.svg)

### Multiple UUIDs in the cluster

In reality, `A` cannot just hold the logic to drop transactions with its own uuid. This is because `A` is in a database cluster with `A_slave`. In the event of a failover, `A_slave` would be the acting master instead of `A`. The transactions from `B` would have the form `uuid_A_slave:2`. This means that `A` has to know the UUIDs of all slaves in its cluster at the point of replication.

It is challenging to start the replication process with all known UUIDs in the cluster. During a failover or server restart, the UUID is generated again. There could be `uuid_A_old` in the mix of transactions.

To overcome this, a metadata server is needed to remember all UUIDs that were ever taken up by the cluster. The UUID can also be manually set to follow a pattern e.g. clusterA always starts with `11111111` in the UUID. However, this manual operation is prone to human errors. It only takes one database instance to be created without following the operating procedure to break the UUID management. A metadata server is more foolproof, though also more complex to implement.
