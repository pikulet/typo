---
title: Instrumenting Network Throughput in Linux
date: "2020-08-10"
showTags: true
slug: "linux-network-throughput"
tags:
- "networking"
summary: "sar"
---

Oftentimes when we write code, we have to measure the performance of our code - how much CPU and memory resources does it use? `top` and `ps` are frequently used.

I recently was tasked with measuring network throughput, which is when I came across the `sar` command for System Activity Report. It's also known as [sysstat](https://github.com/sysstat/sysstat).

To measure network throughput in 1-second intervals over a period of 10 seoncds:

`sar -n DEV 1 10`