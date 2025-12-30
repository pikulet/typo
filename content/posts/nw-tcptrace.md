---
title: Traceroute with TCP
date: "2019-10-01"
toc: true
showTags: true
slug: "tcp-traceroute"
tags:
- "networking"
summary: "Piecing together the path that our network packets take from source to destination"
---

## Traceroute?
Traceroute is a program used to determine the route that packets take from your computer to a destination. Most UNIX systems come with a default traceroute program.

Usually, traceroute is implemented over UDP. Packets are sent with an increasing time-to-live (TTL) value in the IP header. When the TTL expires, an ICMP error message is sent back to the host. Information on the intermediate hops is extracted from these ICMP error messages.

To detect when the destination has been reached, the UDP message is actually sent to a random, unused port (e.g. 10293). Since the port has no service running, an ICMP port unreachable error is sent back to the host.

### Why implement traceroute using TCP?

Some hosts have firewalls that disable UDP messages, as most applications running over HTTP also use TCP.

## TCP traceroute mechanism

The TCP traceroute mechanism is also error-based. The expiring TTL mechanism is used to detect the intermediate hops. Interestingly, probing packet is a TCP SYN packet, which is used to start a TCP 3-way handshake. The packet is also sent to an unused port which is not interested in starting a 3-way handshake. 

Two scenarios can arise, the port can return an ICMP port unreachable error. However, it is more common to encounter the TCP RST packet. These RST packets are used when an unpected TCP packet arrives at a host

### Implementation in C

A raw socket can be used to send the TCP messages. The SYN flag should be set. A tricky problem with using raw sockets is that the TCP checksum has to be manually configured. 

I found out about the use of pseudoheaders in calculating TCP checksums. Basically, part of the information in the IP header is actually included within this pseudoheader. Additionally, each time the TTL is reconfigured, the IP checksum has to be recalculated.

Using raw sockets and pseudoheaders is really complicated. That's when my classmate proposed using TCP sockets (`SOCK_STREAM`). The `connect()` routine automatically triggers a TCP SYN packet to be sent!

However, one must also account for the probing packets that never return. This timeout can be checked using `setsockopt()`.

Lastly, I put everything together by running `connect()`. Once the function returns or a timeout is triggered, I can check the `errno` being set. Some examples of the `errno` values that could occur:

- `EHOSTUNREACH`: an ICMP error has been received. Probably an intermediate host, but could be the final destination`.
- `ETIMEDOUT`: a timeout has occurred
- `EINPROGRESS`, EALREADY: a timeout has occurred, could be consecutive timeouts
- `ECONNRESET`: The TCP RST packet; the final destination has been reached
- `ECONNREFUSED`: The final destination has been reached

## Remarks

This project has been a great way to understand about socket programming. It's very fulfilling to have built a traceroute in TCP, albeit simplified. Socket programming is fundamental in writing network applications, and I hope to work with it more in future.

The traceroute program can be found [here](https://github.com/pikulet/tcptrace).

