---
title: Software-Defined Networking
date: "2019-12-18"
showTags: true
slug: "sdn-mininet-pox"
tags:
- "networking"
summary: "A demonstration of SDN - programmable switches with Mininet and POX"
---

Software-Defined Networking (SDN) is a buzzword in computer networks, but what does it actually mean? At its heart, SDN aims to redefine the Internet to suit modern uses.

The Internet as we know it today evolved from `ARPANET`, which was a computer network designed for specialised military and academic use. Before WW-II, no one would have fathomed how the Internet has spread to be a ubiquitous necessity of the modern world.

In short, the Internet wasn't designed for its current use. As a result, it didn't really get the privilege of being meticulously planned with a big picture of how it should be. 

In its current state, multiple RFCs are constantly being proposed, redefining what standards and protocols should be used. These protocols aim to help parties decide on how to communicate with each other. For instance, clapping is a sign of approval and respect between humans.

The Internet, being complex, can be divided into a few layers. Some layers are responsible for getting a message across a single wire. Some are more complex, and are responsible for deciding how messages should be routed across the world. This complex layer is known as the *Network Layer*, and the dominant protocol used is the *Internet Protocol (IP)*.

However, the problem is that the **Network layer is responsible for too many things** and doesn't leave a lot of room for customisation. As a result, SDN was conceptualised.

> SDN allows switches to be programmable.

Having programmable switches makes it easier to introduce code for network monitoring, or even customise existing protocols like how switches forward packets. All these programmable switches are centrally controlled by (one or a few) controllers, which can coordinate the overall network behaviour.

![Traditional networking vs SDN architecture](/media/sdn-vs-traditional.svg)

![SDN three-tier architecture with controller, switches, and hosts](/media/sdn-architecture.svg)

## Getting Started on SDN

The gist I've written [here](https://gist.github.com/pikulet/e8de2664e01be4542b810af2e2de833f) shows three examples of SDN in action. These examples were written based on the POX controller, and tested using Mininet to simulate the network (instead of actually purchasing 10+ switches). The controller and virtual switches are communicating using the OpenFlow API.

In particular, the functionalities achieved are:
- Self-Learning Switches
- Quality of Service differentiation (certain flows like TCP get higher bandwidth)
- Firewall
