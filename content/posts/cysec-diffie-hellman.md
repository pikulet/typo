---
title: Diffie-Hellman Key Exchange Protocol
date: "2023-03-10"
showTags: true
math: true
slug: "diffie-hellman-key-exchange"
tags:
  - "cryptography"
summary: "Establishing a shared secret over insecure channels"
---

## What are Key Exchange Protocols?

When the internet first started, universities and research institutes would lay cables from one end to the other. No communication would pass by another eavesdropper, as the very cables were physically secured. However, when the modern internet evolved, packets were sent everywhere. To visit a website hosted in America (e.g. Netflix), the packet would pass through many routers based in many countries. How then, can any communication be secure if the channel itself is insecure?

In cryptographic communication, both communicating parties (Alice and Bob) need to know a shared secret. This way, any messages encrypted using this secret key cannot be decrypted by malicious listeners. However, before the communication can be encrypted using the key, Alice and Bob need to **decide on the secret key that they will be using**. During this decision process, the communication channel is still insecure and susceptible to eavesdropping.

For instance, Alice cannot simply tell Bob that the key will be 81729312 as eavesdroppers will also know the key. Key Exchange Protocols are designed to allow Alice and Bob to agree on a shared secret key even with an eavesdropper present. One class of key exchange protocols is the **Diffie-Hellman Key Exchange**.

### Diffie-Hellman Protocol

Paint Mixing Intuition:

![Paint Mixing Analogy](/media/dh-paint-mix.png)

The protocol works by having two people mix paint in public. The final key is the Brown derived by mixing Blue(B) + Yellow(Y) + Red(R) in a 1:1:1 ratio. If these three paints are shared publicly, then anyone can mix the brown paint on their own. However, during the exchange, only Blue(B), Green(G) and Purple(P) are public. 

Without the secret mix of either Yellow OR Red, eavesdroppers cannot piece together the same colour mix. Any combination of mixing B/G/P *cannot* get B+Y+R in that ratio. 
For instance, mixing one portion of each B/G/P derives a paint with the ratio of 3B:1Y:1R.

## Why is Diffie-Hellman Secure?

Having precise assumptions in cryptography is important. These assumptions become the only uncertainty in the cryptosystem. For instance, we say that RSA cryptosystems are secure because performing prime factorisation is difficult. 

Similarly, the Diffie-Hellman (DH) protocol can be reduced to a **mathematically intractable** problem. That is, if one day a new algorithm or a breakthrough in computing power allow us to easily solve these mathematical problems, then the protocol is insecure. We can then quantify the security of our systems by **reducing** them to mathematical problems.

## Cyclic Groups

Diffie-Hellman mathematics is based on operations in **cyclic groups**. Here's an example of cyclic groups:

Consider a generator $g$ (a starting number whose successive powers produce elements in the group) and a modulus $n$.

The group $\langle g \rangle$ is defined as $\langle g, g^2, g^3, ... \rangle mod\ n$

Example: $g = 3, n = 23$, then 

$\langle g \rangle \\\
=\ \langle 3\ mod\ 23,\ 3^2\ mod\ 23,\ 3^3\ mod\ 23\ ... \rangle\\\\
=\ \langle 3\ mod\ 23,\ 9\ mod\ 23,\ 27\ mod\ 23\ ... \rangle\\\\
=\ \langle 3,\ 9,\ 4,\ 12,\ 13,\ 16,\ 2,\ 6,\ 18,\ 8,\ 1 \rangle $

Note that the group $\langle g \rangle$ is **finite** (order = $11$ elements) because the operations are done over modulus $n$. The maximum number of elements in the group is $n - 1$.

## Diffie-Hellman Problems

To help relate group mathematics with the applications of the Diffie-Hellman Key Exchange Protocol, we first formulate a few mathematical problems.

### Discrete Logarithm (DL) Problem

The discrete logarithm problem asks: given a result, find the exponent that produced it.

Given $x$, find $r$ such that $x = g^r$. Example: Let $g = 3$, in modulus $23$. Given $x = 8$, find $r$ such that $8 = 3^r \bmod 23$.

Since we have already generated the whole group earlier, we get r = 10. However, it is generally difficult to compute $r$ without generating the entire group.
 
### Computational Diffie-Hellman (CDH) Problem

> Given $g^a$ and $g^b$, find $g^{ab}$. Example: Let $g = 3$, in modulus $23$. Given $3^a = 4$, $3^b = 16$, find $3^{ab}$.

First, we solve for `a = 3` and `b = 6`. Then,

$$3^{ab} = 3^{18} = 3^{(11+7)} = 3^{11} \cdot 3^7 = 1 \cdot 3^7 \pmod{23} = 2 \pmod{23}$$

Notice that we solved the DL problem to solve the CDH problem. 

Hence, $\text{DL easy} \Rightarrow \text{CDH easy}$.
 
### Decisional Diffie-Hellman (DDH) Problem

Given $g^a$, $g^b$, distinguish between a random $g^c$ and $g^{ab}$. Example: Let $g = 3$, in modulus $23$. Given $3^a = 4$, $3^b = 12$. Now, given $8$ and $3$, decide which is $g^{ab}$ and which is $g^c$.

We first solve for $a = 3$ and $b = 4$, $3^{ab} = 3^{12} = 3^{11} \cdot 3 = 3$. Hence $3 = 3^{ab}$ and $8 = g^c$. We solved the CDH problem to solve the DDH problem. Hence, $\text{CDH easy} \Rightarrow \text{DDH easy}$.
 
By comparing the three problems, we have the statement that $\text{DL easy} \Rightarrow \text{CDH easy} \Rightarrow \text{DDH easy}$. If we can efficiently calculate the discrete logarithm in a cyclic group, then we can also solve the CDH and DDH problems in that group. 

Considering the *contrapositive* logical equivalent ($A \Rightarrow B \equiv \lnot B \Rightarrow \lnot A$), we have that $\text{DDH hard} \Rightarrow \text{CDH hard} \Rightarrow \text{DL hard}$.

A group where the DDH problem is hard would be ideal for all cryptographic schemes relying on either the DDH, CDH or DL problems. CDH and DL would also be difficult in the group. However, we may not need such a powerful group satisfying all the mathematical assumptions. We only need a group that satisfies the DL intractability.

## Putting Everything Together
 
Precisely defining the Diffie-Hellman problems gave us a means to specify the mathematical assumptions made in designing the key exchange protocol.

In the Diffie-Hellman Key Exchange, the following events take place:

1. Alice and Bob establish $g$ and a modulus $n$, which is public. This defines the cyclic group.
2. Alice and Bob each have a personal secret, $a$ and $b$.
3. Alice sends Bob $A = g^a$ and Bob calculates $K = g^{ab} = A^b$. Bob now has the key $K$.
4. Bob sends Alice $B = g^b$ and Alice calculates $K = g^{ab} = B^a$. Alice now has the key $K$.

![Diffie-Hellman Protocol Flow](/media/dh-protocol-flow.svg)

Because the exponential operation is commutative (independent of the order in which it is executed), both parties can arrive at the same result despite deriving them in different orders.

Since the communication is still not encrypted, any eavesdropper can retrieve everything that Alice and Bob sent to each other: $g$, $n$, $A = g^a$ and $B = g^b$. Given these values, the eavesdropper must find the key $K = g^{ab}$. This description is exactly the **CDH problem**. Minimally, we must use a mathematical group where the CDH problem is hard. We do not necessarily need a DDH-hard group, just a CDH-hard group.

A classic example of a group that is CDH-hard but not DDH-hard are the $\mathbb{Z}_p^{\ast}$ groups. 

Let $p$ be a prime number, then $\mathbb{Z}_p^{\ast} = \{1, 2, 3, 4, 5, \ldots, p-1\}$.

Diffie-Hellman problems form the cryptographic foundation for many other applications, not just the key exchange protocol. However, if a cryptosystem scheme is designed based on the DDH problem, then the users must ensure that the DDH problem is hard in the cyclic group used.

## Attacking the Diffie-Hellman Key Exchange

However, in modern communication channels, eavesdropping is not the only problem. A CDH-hard group can only protect the key exchange from an **eavesdropper**. Attackers have other capabilities, such as **interception**.

![Man-in-the-middle (MITM) Attack](/media/dh-mitm.png)

A middleman can create a new secret $c$ and calculate $g^c$.
- When Alice sends $g^a$, $M$ intercepts it and sends Alice $g^c$. Alice communicates with $M$ using $K_1 = g^{ac}$.
- When Bob sends $g^b$, $M$ intercepts it and sends Bob $g^c$. Bob communicates with $M$ using $K_2 = g^{bc}$.

Alice will think that she is communicating with Bob using $K_1$. Bob will think he is talking to Alice using $K_2$.

The problem in this Man-in-the-Middle (MITM) attack is that the Diffie-Hellman Key Exchange protocol was never designed for **authentication** (verifying that you're actually talking to who you think you are). 

The identities of both parties are never established. Even without the presence of `M`, Alice cannot confidently ascertain that the person she is talking to is indeed Bob. Authentication protocols can be used to establish that $g^b$ was indeed generated by the person Bob, such as using certificates for verification. 

This is exactly why the SSL/TLS handshake (the protocol your browser uses to establish a secure HTTPS connection) combines Diffie-Hellman with certificate-based authentication. A certificate is a proof of identity issued by a *trusted* authority, so when we receive a message with a certificate name: Alice, we are sure the message is indeed from Alice, and not from Mallory.

## Remarks

The mathematical solution of the Diffie-Hellman Key Exchange is elegant. Two parties exchange messages with each other in public, much like two people talking to each other in public. At the end of the protocol, they can decide on a shared key that no one else knows. The important factor is that **information is not exactly shared during the exchange -- information is created**.

This is the math behind every HTTPS connection you make. The TLS handshake uses a variant of Diffie-Hellman to establish a session key before any application data is sent, and SSH connections and VPNs rely on it too. The elegant math in this post is running, right now, billions of times a day across the internet.

In reality, key exchange protocols like the TLS handshake being used to establish an encrypted channel with the bank are more complicated. Hopefully, this article has given the reader a brief understanding of the topic.
