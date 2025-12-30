---
title: Database Migration
date: "2021-10-18"
toc: true
showTags: true
slug: "database-migration"
tags:
- "cloud infrastructure"
- "databases"
summary: "The nitty-gritty beyond the click of a button"
---

Most software engineers are familiar with database migrations. There are a plethora of readily-available tools to perform migrations, at just the click of a button. This article delves into some topics and concepts about database migrations.

## What is Database Migration

Suppose that your application is currently using a database, but it encounters increasing write pressure, e.g. due to an increasing user base. At this time, the database administrator might recommend **sharding** the database.

The most straightforward method to migrate a database is to stop all writes to the database, then copy all the data over to the new one. Once that copy process has concluded, then the application can continue writing to the database. 

However, this **offline migration** is problematic in real-time applications that cannot afford to simply stop writing to a database. The database might be very large, and the migration process could be in the order of days.

More often that not, applications would prefer to carry out **online migration**, where the database has no downtime.

### Types of Database Migration

First, I'll give an overview of how database migration are commonly performed. There are two main types of migration, namely scan-based and binlog-based.

- **Scan-based** migration: read from the old database (`SELECT`), and then write to the new database.

- **Binlog-based** replication: read an event from the binary log (binlog), and then replicate that event to the new database. 

Binlog replication is used in master-slave replication. Each time the application writes to the database master, the slave reads the change and copies it. Reading the change is more efficient that scanning the entire database to copy what is different. 

However, applications can have a large number of change events. In that case, it is not feasible to store those changes for a long period of time. An expiry date is attached to binlog files.

### Why both techniques are needed in Online Migration

Now we can delve into the intricacies of online migration.

First, let's have a database with a lot of data, and some data was written a long time ago. Most of the binlogs would have already expired, so scan-based migration is needed. We also let the migration process read the rows in order, from primary key `1`, to `2` and so on, up to a million.

Remember that during this process of scanning and copying the million rows (which might take 3 days), the database is still online. The application continues to write to the database. 

## Data Inconsistency in Online Migration

Next, I'll talk about a data inconsistency that can occur when we mix scan-based migration and binlog-based replication.

### Scan before Write

Suppose that the row `id=1` has been scan-copied to the new database. At this time, the application modifies the row `id=1`. The migration process needs to ensure that the new data for `id=1` can be copied over to the new database. It can do so by referring to the binlogs and there would be **no issues** with this case.

#### Write before Scan - data inconsistency

However, we also need to consider that writes can occur before scans. The application modifies the row `id=30000` before the scan process has copied `id=30000` over. If we follow the chronological order of events, there's a need to **wait** for the scan process before the write. Else, the migration process first deletes the row in the new database, before the scan process incorrectly inserts the row again.

However, waiting for the scan to complete is not viable. The binlog could expire during the process of waiting for the scan the complete. 

We can counter this expiry by keeping all the binlog files in-memory, but that would contradict why the files had to expire in the first place. In real-time systems, these files are simply very **LARGE**.

## Further Reading

Different systems have their own techniques to cover these pitfalls of database migration, one of which being the more well-known [gh-ost](https://github.com/github/gh-ost) by Github.

There is also a more detailed article about these concepts by Google that comes in [Part 1](https://cloud.google.com/architecture/database-migration-concepts-principles-part-1) and [Part 2](https://cloud.google.com/architecture/database-migration-concepts-principles-part-2).