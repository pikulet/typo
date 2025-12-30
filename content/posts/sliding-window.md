---
title: Static Sliding Windows
date: "2021-09-12"
showTags: true
slug: "stuck-sliding-window"
tags:
- "programming"
summary: "Ensuring that a sliding window will not stay in the same position over time"
---

Sliding Windows are an important programming abstract, themselves forming a whole class of leetcode problems. However, there's a big difference between leetcode and production systems. Namely, leetcode functions similarly to batch processing systems, where we have a fixed set of input that we'll try to fit through the sliding window gradually. However, **real-time** production systems have the issue the messages come basically whenever they want, and there might not be control that messages might come or not.

As a result, one problem is that incorrect downstream processing could lead to messages in the sliding window not being ACK-ed. All 100 spaces in the window might be filled up - new messages can't be added, and old messages never leave. These kinds of problems are hard to diagnose, because the process will be churning in an infinite loop, and no error logs might give any indication that the sliding window can't progress.

The resolution then is to add a **timeout** check, so we can catch when a messaged has overstayed. (And we know immigration authorities are really adept at this task). I'll present two methods of timeout checks.

### Attaching a Timeout to every message

Each time a message is sent into the window, we start a timer process. If the message exits the window before that, we can cancel the timer. Realising this in Golang would be starting a goroutine for each message's timer, and then cancelling an associated context when the message exits. However, a large window would translate to a large number of active goroutines.

### A single Timeout for the whole window

The alternative is to start one ticker that runs, and check the age of the first message at regular intervals (e.g. every 10 seconds). However, this means that the longest amount of time a message can be stuck is approximately `2x`, where `x` is the monitoring interval. This could be bad for services that require responsiveness in reporting faults.

## Remarks

The problem is that programming solutions are only optimised if you understand your operational context. For instance, if you have multiple messages that repeatedly flow through the window, then the latter method would be better due to the high costs of starting multiple goroutines. However, if you have sparse message flow that are very important (e.g. in a monitoring system reporting fatal problems), then the former method would be better.
