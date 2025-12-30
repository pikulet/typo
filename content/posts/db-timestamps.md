---
title: Timestamps in Distributed Systems
date: "2023-04-03"
toc: true
showTags: true
slug: "database-timestamps"
tags:
- "cloud infrastructure"
- "databases"
summary: "Ensuring the accuracy of transaction timestamps in database, so that we can fairly resolve timestamp conflicts"
---

## Distributed databases and data consistency

In a traditional database architecture, redundancy is achieved via a master-slave architecture. That is, suppose we want to replicate the database thrice to ensure that there is back up data, or to improve read performance, we would assign one of the database nodes as a master. Database writes that involve changing the stored data would only be written to the master. On the other hand, database reads can be performed on any of the nodes.

A master-slave architecture ensures that only one node can receive changes. The master node can use local locks to achieve transation isolation, essentially preventing two people from concurrently changing the data and creating a conflict. However, modern database architectures are evolving towards a more distributed approach, meaning that writes could occur from various nodes. 

Distributed databases boast improved performance, but how do we resolve the transaction conflicts?

### Couldn't we just use timestamps?

Well, a simple idea would be to attach a UNIX timestamp to every transaction. Suppose that we both write to two different nodes, and are trying to change the same piece of data. We would resolve the conflict by considering the timestamp of the change, giving priority to the earlier change. The later change could be invalidated by the first transaction.

However, a **timestamp authenticity** problem arises - the timestamps are written by the nodes themselves. An incorrect or malicious configuration would unfairly prioritise transactions from certain nodes, for instance by just setting the clock a little earlier.

## Timestamping Solutions

Hence, the timestamps itself need to be issued in a verified and fair manner. There are a few ways timestamps could be accurate.

### TrueTime

> [[Reference] Spanner: TrueTime and external consistency](https://cloud.google.com/spanner/docs/true-time-external-consistency)

TrueTime is a hardware-based solution based on GPS and atomic clocks. Firstly, the commit timestamps are already highly accurate based on hardware. Secondly, a time interval is given for every transaction, as additional buffer against latency and errors. If TrueTime gives a timestamp interval of [12PM, 12.01PM], it is **guaranteed** that the current time is within the interval. In reality, this interval is much smaller and has much more precision, due to the high-performance proprietary hardware.

Spanner will only commit changes at the second timestamp, and reflect the new change to anyone querying the data **after** the second timestamp. This system guarantees **external consistency** on all data changes, which is stricter than the **strong consistency** in most distributed databases.

**Strong consistency**: Changes to a single piece of data are consistent and linear. That is, I could change my phone number on an application, and anyone querying my phone number would see the latest change as intended.

**External consistency**: Changes to multiple pieces of data are linear. That is, I could change my phone number, and you could change your address on another application. There is a global chronology to all changes, due to TrueTime.


### Timestamp Oracle (TSO)

Timestamp Oracles are services that issue a globally unique timestamp to transactions. Unlike TrueTime, this timestamp is not the **real physical time**, meaning it is more feasible to implement without expensive and proprietary hardware. TSOs are used in TiDB. 

However, because an **additional service has to perform timestamp allocation**, there is increased transaction latency.

### Hybrid Logical Clock (HLC)

Unlike TrueTime and TSOs, there is no service specially responsible for issuing timestamps in HLC systems. HLCs eponymously combine a physical clock and logical clock. A physical clock is one like TrueTime/ machine time, whereas a logical clock is relative like "1 unit of time" or "position 2 on the timeline". 

The physical time component ensures that most transactions are already fairly accurate. The logical time component is used as a tiebreaker between transactions with the exact same physical time. 

MongoDB instances will regularly share their HLC counters with each other, ensuring that the HLC timestamp is unique. Unfortunately, syncing is complex, prone to **clock drift inaccuracy**, and hard to scale when the number of nodes in a distributed system increases.

## Remarks

TrueTime is magical in its external consistency guarantees, but is not widely feasible due to its **reliance on hardware**. Just like it is hard to achieve exactly-once message delivery in a performant system, we are currently just accepting the (minor) latency of timestamp oracles and inaccuracies of HLCs. 

These timestamping systems are still feasible, just not with the precision we might expect of a computing system. However, could we even achieve the same in the absence of computers?

In a classroom, we might have two students speaking up to answer a question at the same time. Just relying on our hearing alone, we would have to make some guesses and leeway in deciding who went first. 

If we were to apply this to a monetary scenario in person, the same issues would arise. Two people might lay claim to the same $10 note at the same perceived time. Without the tools of microscopic audio processing, we are merely making informed guesses about who to give the money to. How can we do this if the two people claimed the note while being in two different continents?
