---
title: SMTP Ports and RFC Compliance
date: "2019-09-10"
showTags: true
slug: "smtp-ports"
tags:
- "networking"
summary: "The story of unstandardised SMTP ports, and what this story says about the role of RFCs in global tech standardisation"
---

The Simple Mail Transfer Protocol (SMTP) is used when users want to send mail to a mail server (which will eventually get delivered to the intended recipient). There are a few ports associated with SMTP, and I'd like to share the history of their evolution.

![SMTP Evolution](/media/smtp-evolution.png)

**At first, there was port 25.**

In 1982, RFC821 was published, demarcating port 25 as the default transmission channel for internet email. (Now, the most updated RFC for SMTP is RFC5321.)

**Then, port 587 was used to differentiate mail submission and mail relay.**

In 1998, RFC2476 was published, elucidating the differences between the concepts of message submission and message relay. The RFC defined message submission by users (Message Submission Agents, MSAs) to be done over port 587, while relay traffic between mail servers (Message Transfer Agents, MTAs) happens over port 25. The separation would allow developers and network administrators to better implement security policies and authentication.

![SMTP Mail Delivery Chain](/media/smtp-delivery-chain.svg)

**Port 465 was registered and revoked.**

Around 1998, Port 465 was briefly registered (by IANA, not IETF) as the "smtps" port for SSL encryption of SMTP traffic.

In 1999, RFC2487 was published, recommending the use of TLS to secure SMTP connections. STARTTLS was born here, allowing users to toggle between encrypted and unencrypted traffic in the same port. (Today, traffic over port 587 is often secured using STARTTLS.) This feature led to the revoking of IANA's registration, since there was no need for a different port just for encrypted SMTP connections.

**Confusion led to port 465 being used even though it was not RFC-compliant.**

Unfortunately, some ubiquitous mail applications may have mistakenly interpreted the last "s" in "smtps" to mean "submission". In many mail applications, port 465 became the default port when secured connections (via TLS) were requested. However, there was no RFC actually specifying the use of port 465. The legacy effects of IANA's brief registration of port 465 continue today.

**A proposal for port 465 to be officially recognised.**

In 2017, RFC8314 proposed that port 465 should be officially recognised as the port for implicitly encrypted SMTP submissions. The service to be run would be eponymously named "submissions". This RFC would unite a decades-long debate where purists consistently emphasise that port 465 was not RFC-compliant.

## Questions
- How do we deal with inconsistencies with official specification? An example would be when port 465 was not RFC-compliant as an SMTP submission port.
- Port 2525 is emerging as an (unofficial) alternative to port 587. What were the key considerations in introducing this port for SMTP submission?
- What are some other cases of RFC incompliance, and how did the story unfold?

## Readings

- [RFC8314](https://tools.ietf.org/html/rfc8314#section-7.3) has a short discussion on why port 465 was so widely used before it was published.

- This [post](https://www.mailgun.com/blog/which-smtp-port-understanding-ports-25-465-587) is the reference I am drawing from.
