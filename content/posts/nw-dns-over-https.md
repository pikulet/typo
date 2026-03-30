---
title: DNS-over-HTTPS
date: "2019-11-10"
showTags: true
slug: "dns-over-https"
tags:
- "networking"
summary: "Originally meant as a workaround so ISPs couldn't track our activity history using DNS packets. A great idea but doesn't seem to achieve what it set out to do."
---

DNS requests are usually made over UDP, in plaintext. In a bid to **introduce more privacy** in DNS traffic, DNS-over-HTTPS (DoH) was published in Oct 2018 ([RFC 8484](https://tools.ietf.org/html/rfc8484)). The DNS traffic will be encrypted, and appear to be like normal HTTPS traffic.

![Traditional DNS vs DNS-over-HTTPS](/media/dns-vs-doh.svg)

Companies are marketing DoH as a way to prevent ISPs from tracking users' web traffic, and as a way to bypass censorship in (some) countries. However, there is more to this story...

### DoH doesn't actually prevent ISPs from tracking your traffic!

Yes, your DNS traffic remains encrypted... but

- For HTTP traffic, the destination site is in plaintext
- For HTTPS traffic, the ISP can look at the [Server Name Indication (SNI)](https://www.cloudflare.com/learning/ssl/what-is-sni/) field, which is where the client indicates the hostname it wants to connect to during the TLS handshake. (The SNI field is an optional extension of TLS)
- Of course, people have also proposed [encrypting the SNI field](https://datatracker.ietf.org/doc/draft-ietf-tls-esni/history/)

The traffic is encrypted, but using the HTTPS layer is not doing useful protection of any data.

### DoH has implications on security policies, and could benefit the wrong people

Since DNS traffic is now encrypted, companies will find it harder to implement security policies (e.g. no Facebook at work), possibly facilitating the spread of malware.

- Example: The malware [Godlua](https://www.bleepingcomputer.com/news/security/new-godlua-malware-evades-traffic-monitoring-via-dns-over-https/) has abused DoH to communicate with its command and control without being easily detected.
- Example: It would be [harder to filter content like child abuse](https://news.sky.com/story/googles-chrome-browser-plans-risk-undermining-fight-against-online-child-abuse-govt-warned-11734166).

#### So, given these concerns, do we forego DNS-over-HTTPS?

DNS-over-HTTPS has roused the security community, but the general consensus seems to be that its benefits have been overstated.

There are other proposals like DNSSEC ([RFC 4033](https://tools.ietf.org/html/rfc4033)) and DNS-over-TLS (DoT, [RFC 7858](https://tools.ietf.org/html/rfc7858)), [DNSCrypt](https://en.wikipedia.org/wiki/DNSCrypt), but these also have their own security concerns.

Privacy in our DNS traffic is important, and this is currently still a work in progress in security research! Just maybe not using DNS-over-HTTPS.

### Readings
- [A quick read](https://www.zdnet.com/article/dns-over-https-causes-more-problems-than-it-solves-experts-say/)
- [An elaborate discussion on privacy; also contains information on metadata leaks like SNI](https://blog.apnic.net/2019/10/03/opinion-centralized-doh-is-bad-for-privacy-in-2019-and-beyond/)

I do recommend reading and comparing the different schemes proposed to introduce privacy in DNS traffic.
