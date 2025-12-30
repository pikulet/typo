---
title: Asynchronous producer-consumer model
date: "2021-09-23"
template: "post"
draft: true
slug: "message-queue"
category: "cloud infrastructure"
tags:
 - "kafka"
description: "A self-note of basic concepts in Message Queues (MQ)"
---

It's very common for services to send messages to each other within a business ecosystem. However, the producer sending the message and the consumer receiving the message might not both be alive at the same time.

As a result, we introduce an intermediary **broker** that first receives messages from the producer, from which messages can later be consumed from **asynchronously**. Using a broker also makes it possible to have flexible producer-consumer topologies, such as having multiple producers and multiple consumers. 

This architecture is essentially a [message queue](https://en.wikipedia.org/wiki/Message_queue) or a publisher-subscriber model. Some common MQ systems include Apache Kafka, RabbitMQ and Amazon Simple Queue Service (SQS).

Kafka is a great place to start running your own MQ service locally and diving into multiple aspects like **redundancy replication**, **partial ordering** to increase concurrency and more. Undeliverable messages might also be added to a **dead-letter queue** (DLQ).

There are lots of interesting concepts relating to message queue systems and how they have made information transfer so scalable. If you're dipping your hands into kafka, `kcat` is a good command-line tool to interact with a kafka cluster.

I've been heavily exposed to message queues in my current job, and many concepts were so foreign. I recently took a kafka class, which helped structure my understanding of this topic better and allowed me to see the bigger picture. Anyone working with scalable and distributed systems will definitely find this topic very handy.

I took some notes, which might be useful for future reference.

## Kafka Notes
- Kafka is commonly used in the SMACK architecture. Spark (engine), Mesos (orchestration), Akka (model), Cassandra (storage), and Kafka (message broker)
- RDD = Resilient Distributed Dataset

**Kafka Clusters**
- Every partition has a preferred leader
- High Water Mark = offset that is fully replicated
- Producer Idempotence -> Able to retry producing without duplication (via sequence number, which is committed to log for fault tolerance)
- Producer can be synchronous (wait for broker reply) or asynchronous
- Consumers in the same Consumer Group share the same consumption offset

**Others**
- Kafka Administration allows for Controlled Shutdown: ensure that an in-sync replica can take over as leader before maintenance shutdowns
- Kafka Streams allows users to create data processing pipelines connecting two Kafka clusters
