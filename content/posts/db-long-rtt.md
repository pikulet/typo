---
title: Long Round-Trip Time(RTT) Optimisations
date: "2022-08-14"
toc: true
showTags: true
slug: "long-distance-migration"
tags:
- "cloud infrastructure"
- "databases"
summary: "Improving the throughput of database synchronisation in networks with a long RTT"
---

TCP is a protocol used for reliable data transfer. For each piece of data that I'm sending to you, I would expect a reply or acknowledgement (ACK) that you have received this reply. To improve the network throughput, TCP communication also involves a sliding window, where multiple sequenced messages can be sent out, and the replies can come back in any order.

## Issues with long RTT communication

When this communcation occurs over long physical distances (e.g. from Singapore to US), then the time taken for a message to reach US and then its ACK to return to Singapore is long. We call this the long RTT (Round-Trip Time) scenario.

In such a case, we would need to send a very large number of in-flight messages to counteract the effect of the long RTT and maintain the same throuhgput. However, having a lot of in-flight messages (e.g. 100k) also means that there has to be an in-memory tracker for all of these messages.

## Optimisation: Batch Processing

One way to reduce the number of in-flight messages is to package multiple messages into one large packet. This method of **batch processing** means that with just one in-flight message, we have in reality sent 1000 messages to the recipient.

Batch processing is a generic optimisation that simply concatenates multiple messages together. It can be applied in a multitude of long RTT communication scenarios.

## Optimisation: Concurrency

Messages can be sent **concurrently**, so one message need not wait for its predecessor to first return. The correctness of concurrency is application-specific. For database migrations, different tables would be independent of each other. Furthermore, different primary keys are also independent of each other. This means that we only need to ensure the in-order correctness of messages with the same table and same primary key. Data sharding is key in increasing concurrency.

## Optimisation: Message Compression

There are also application-specific optimisations that can be performed to compress the messages (besides binary compression algorithms). For instance, in the case of database migration, we can also **compress messages by merging them**. Two database operations on the same primary key can be merged to one operation, using the following steps.

- `x + DELETE --> NONE`
- `INSERT + UPDATE --> INSERT`
- `UPDATE + UPDATE --> UPDATE`
- `DELETE + INSERT --> UPDATE (with default values)`

These transformation functions can be composed together, merging a large number of messages to just one.
