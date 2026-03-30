---
title: BBR Congestion Control
date: "2022-05-10"
showTags: true
slug: "bbr-congestion-control"
tags:
- "networking"
summary: "A modern congestion control algorithm"
---

TCP is a known transport-layer protocol, but it comes in many variants or flavours of congestion control algorithms. Congestion Control is concerned with how we deal with data when there is too much data in the network and data cannot be sent to the destination. What are the criteria used to determine if a network is congested, and what are the measures used to counter that?

Examples of TCP Congestion Control algorithms include TCP Tahoe, TCP Reno and TCP New Reno. In modern times (the last 20 years), the two more recognised ones are CUBIC and BBR.

### Loss-based Congestion Control

Most of the older congestion control algorithms are **loss-based**, where they reduce the network traffic when packet loss is encountered. For instance, they might ask the sender to slow down data transmission. Unfortunately, responding to packet loss might not be responding to congestion (the real problem we want to tackle). 

When the buffers are shallow, packets can be lost due to transient traffic bursts even when there is no congestion. Reducing the sending rate then results in sub-optimal performance.

On the other hand, when buffers are deep, many packets are continuously being sent even when the network is congested. The filled buffers unnecessarily take up valuable machine resources, a problem known as **bufferbloat**.

![Shallow buffer vs. deep buffer (bufferbloat)](/media/bbr-bufferbloat.svg)

### Model-based Congestion Control

[BBR](https://github.com/google/bbr) (Bottleneck Bandwidth and Round-trip propagation time) instead forms a **model** of the internet, by predicting the **optimal network traffic**. It uses two metrics, the maximum bandwidth and minimum RTT, to model a network link. With this knowledge of the network conditions, the algorithm then sends packets based on this optimal network traffic value.

![BBR's two-metric model and optimal operating point](/media/bbr-optimal-point.svg)

By sending data within the bandwidth limits, BBR achieves *congestion avoidance*. Furthermore, the algorithm does not make knee-jerk reactions to temporary packet loss situations, sending packets at a more stable rate and giving users a better overall throughput.

![Loss-based (TCP Reno) vs. BBR sending rate over time](/media/bbr-vs-lossbased.svg)
