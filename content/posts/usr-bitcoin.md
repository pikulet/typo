---
title: Two Sides of the same (Bit)Coin
date: "2021-03-15"
showTags: true
slug: "bitcoin-reflection"
tags:
- "inquiry"
- "reflection"
summary: "Working with an economics major to analyse Bitcoin"
---

Recently, I was tasked to work with a friend majoring in economics to do a joint reflection, so we decided to work on a topic close to both of our experiences: Bitcoin. I am writing the gist of the presentation we shared in class, but credit should definitely go to my partner, Jennifer Yao.

## Brief Overview of Bitcoin

Bitcoin is a digital currency with no central authority. Instead, everyone in Singapore (for instance) would have access to a shared ledger. 

Now suppose that I want to transfer money to you, then anyone in Singapore can verify that this transaction is valid. This verification is done using the **Proof of Work** consensus algorithm.

When this transaction has been confirmed, the verifier will tell everyone else that the transaction is valid. In turn, everyone else will record in their own ledger, that I have transferred $10 to you. As a token of thanks for verifying the transaction, the verifier will get paid in more Bitcoins. This verifier is known as a **miner**, because the bitcoins he was paid in belonged to no one previously. Mining increases the total number of bitcoins in circulation.

![Bitcoin Transaction Flow](/media/bitcoin-transaction-flow.svg)

## Bitcoin as a Technology

### Kerckhoffs' Principle

The first time I heard of Bitcoin, it was in an introductory cybersecurity class where we learned about Kerckhoffs' Principle.

> Kerckhoffs' Principle is the idea that the design of a system should be as open as possible, and only the cryptographic keys should be kept secret.

From a security perspective this openness brings about two benefits. For one, you can now reduce the system design to a numerical value: the key size. Secondly, in line with the mindset of the Open-Source Software (OSS) community, any **major issues with the program would be more easily detected** and reported. 

Surely, even if I do not 100% get the nuts and bolts of bitcoin, if there was some major issue with Bitcoin, someone would have already announced it within the last decade Bitcoin has been made public. At this point, I assumed that Bitcoin had no major issues with its technology.

### Distributed Technology

My good impressions of Bitcoin were further fuelled by the constant mentions of distributed technologies in various classes I've taken, from a search engine class in my sophomore year and even now in my thesis project. My Computer Science training had, in many ways, subconsciously made me see decentralised tech in a positive light. 

The key benefit I see is that there is **no single point of failure**. In the case of Bitcoin, it would not be possible for me to come in tomorrow and erase my $10 transfer to you. Even if I went rogue and 'deleted' the entry from my ledger, majority of the Bitcoin community (i.e. everyone else in Singapore) would have that transaction on their ledger.

### Cryptographic Primitives

Lastly, being an avid fan of cryptography, I was very surprised to learn that there is an actual mathematical definition on which to judge the security of Bitcoin. Bitcoin is a digital signature scheme based on **Elliptic Curve Cryptography**, and ECC is widely accepted to have **existential unforgeability**. I hedged that statement because... who knows? Perhaps there will be new mathematical methods which disrupt our assumptions of traditional intractable (hard to solve) problems like prime factorisation and discrete logarithms.

### The Naive Approach

In many ways, my training in Computer Science has nudged me towards seeing Bitcoin in a positive light, and even influenced me to invest in Bitcoins myself. However, this first exposure to investing also left me confused why the price of Bitcoin was so volatile and fluctuating. That is, until I got to understand the other side of Bitcoin - how it functions as a currency.

## Bitcoin as a Currency

My partner's first encounters with Bitcoin weren't about learning it as a technology, but understanding it based on how it is in the market. She saw how Bitcoin was commonly associated with scams and cult-like speculation, making her very skeptical of this financial innovation. Just a few weeks ago, the price of Dogecoin skyrocketed after Elon Musk tweeted "Who let the Doge out?", even though Dogecoin is a troll-like altcoin based on the (very cute) shiba inu meme. As an economics major, she had the tendency to **avoid irrational communities** like Bitcoin players.

She had shared way more about Bitcoin economics with me but one of the most insightful ones was about the rise of mining pools. Firstly: what is a mining pool? 

Recall earlier that the person who verifies the transaction gets paid in Bitcoins. Now, the thing is, the verification takes a lot of work so imagine 10 different people working on the same mathematical problem. The bitcoin network only rewards the first person to get the right answer, so there will be 9 disappointed people. Pooled mining just means these 10 people agreed that if any one of them gets the reward, they will split the bitcoins equally.

As you may have figured already, the **expected returns of pooled mining is the same as solo mining**. Pooled miners even enjoy a lower risk, so rational people would opt for pooled mining instead. This incentive structure contradicts the very decentralised nature that Bitcoin purports itself to be. Imagine if one person in the world controlled all the mines - he basically has the right to decide if a transaction is valid or not at will. In 2019, **81%** of the bitcoin verification network was controlled by **Chinese mining pools**.

She was quick to dismiss Bitcoin Technology as a giant Ponzi scheme. The 2008 Global Financial Crisis was caused by a mismanagement of new financial innovations. The financial crisis also was one of the driving factors behind the invention of Bitcoin. However, could the mismanagement (or inability to manage) Bitcoin be a trigger for another financial downturn?

## Reflection

It was interesting how both our majors could systematically train us to think of Bitcoin in two polarising perspectives. This sharing was very insightful for both of us - for me especially because it highlights the importance of **responsible technology**. 

Any technology invented, when accessible, has real-world impacts that need to be carefully considered. While I laud and admire the designer of Bitcoin, Satoshi Nakamoto, it's also shocking when I went back to read the 9-page Bitcoin whitepaper. There were only details on how it would function technically, but **no mentions of the economic ramifications**. While this is not necessarily the job of a programmer, it's definitely important to understand.

### Putting the Disciplinary in Multi-Disciplinary

More importantly, we learnt about what it means to collaborate in a multi-disciplinary manner. Our individual perspectives have been constantly shaped by our own majors, and this allowed us to come into the discussion with technical and economic depth.

Multi-disciplinary collaboration is not just putting two people together, but putting two people with backgrounds so different that **new meaning can be created**. The ensuing discussion doesn't just have breadth, but also depth.

This idea deeply reminds me of [Edelman's Theory of Neuronal Group Selection](/posts/brain-differentiation-integration). Firstly, there must be differentiation/ specialisation. Then, there must be integration/ communication between different specialisations. As a whole, this results in the system having the **highest entropy**, or the most amount of information that can be gained from it.

## Remarks

Our slides can be found [here](/docs/bitcoin.pdf).
