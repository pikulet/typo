---
title: Trusted Metering
date: "2021-05-30"
showTags: true
slug: "trusted-metering"
tags:
- "cybersecurity"
summary: "How can we know that what Amazon bills us is Fair?"
---

I spent the last year working on my honours dissertation, which explores the topic of trusted metering. For many readers, the solution is probably not as interesting as say, the problem that I'm trying to solve in the first place. This article will go through some key ideas in the world on trusted computing, and hopefully inspire you to learn more about the topic.

## Reflections on Trusting Trust 

> The cacophony of keyboard tapping is the familiar orchestra in any lecture hall. But not here. I see a few familiar faces, but this rule of "no laptops during lectures" is rather foreign for a Computer Science class. The professor delves into important mental processes which take place when we take notes with our hands - and I can't agree more. This class was not just trying to teach us What to think, but How to develop our own ways of thinking.

One of the early readings we got was an acclaimed paper, **Reflections on Trusting Trust**. The gist of the paper goes like this: How do you know that the code you're running is doing exactly as you had intended it to?

Your first line of thought would be to verify the compiler. But then we start to invoke a trust chain - how do we know that the compiler code is running as it had been written? Eventually, we arrive at one point and have to unequivocally trust what we are left with.

![Trust Chain](/media/fyp-trust-chain.png)

In the case of my dissertation, we based our assumptions on Trusted Execution Environments (TEEs). 

![Trusted Execution Environment](/media/fyp-tee.png)

In TEEs, the memory space of the **enclave** cannot be read or modified outside of the enclave, and its isolation is guaranteed by hardware design. Even in such a model, we can already elucidate many loopholes for trust to be compromised. For instance, we'd have to trust the way that Intel manufactures their computer chips. But we draw a line and admit the problem - that there must be a static root of trust, or we live in mass hysteria.

The paper goes into more interesting points, and I particularly like one of its challenges: Self-Reproducing Programs, or **quines**. Can you write a program, that when executed, produces itself as the output?

## Do you really know?

This paper set the tone for a lot of the work I did in my honours dissertation, and I highly recommend anyone who's remotely written a computer program to read it. 

But that wasn't the topic of my dissertation. We all know how cloud computing is **the** thing now. Hobbyist machine learning engineers are on their well-lit desks designing fancy models about the human world, but they don't have the resources to own a physical cluster of computers. They put their credit card details online, so their cloud provider like Google or Amazon can charge them twenty cents for every hour that their code runs.

![Cloud Providers as a Black Box](/media/fyp-cloud-metering.png)

But here's the problem. How do you know that the code has actually executed? Even if it was executed, how do you know if it was executed **correctly**? Then, there are also college students looking to build their portfolios. They create web services hosted on Netlify or Heroku, which guarantee them a certain network bandwidth and RAM. Again, here's my question to you - how do you know that your process is running as **efficiently** as you were promised?

## Finally, my dissertation

If you managed to wrap your head around everything up to this point, then you've understood the problem my dissertation is solving. There's a fancy term for it - **Trusted Metering**, or using trusted execution environments (TEEs) to reliably measure a program's resource use.

I designed a framework for how all this can be done, reducing the scope of entities we have to trust. It uses verification checks randomly running in enclave environments to catch under-promising cloud providers.

The second part of my dissertation then measured how effective my framework was. This part is more mechanical, so I simulated a cheating server that slows down or stops programs at will, and showed how my framework could detect this slow down. Then, we go into the usual research portion - I theoretically calculated those detection probabilities and compared them against my experimental results.

That's basically my honours dissertation. If you're interested in reading any of it, I'd be happy to send it to you. Also, here comes extra special thanks to Chelsea who helped me proof-read this beast.

## So, how did that dissertation contribute to society?

In all likelihood, not for the next ten years. Trusted Execution Environments are still a new and pretty unstable technology, but that doesn't stop researchers (or pseudo-researchers like me) from unlocking its full potential.

Yet, I can't walk away from a year of work proclaiming that "it's just experimental". Doing a project on trust really puts you on the edge, because you're constantly distrusting your own work, finding ways that sneaky attackers can destroy the fort you've built. It reinforced in me the problem of security in a lot of our current software.

We build the software first, and then think of how the software can be secured later. In a way, it is like building all the shops and houses before deciding how the city wall should be built. Such a method makes the task of designing the walls extremely difficult, because we are trying to do all that without knocking down the homes. But, if we changed how things are and built the walls before the houses, we would get very similar housing function without the excruciating task of building walls around our structures.

Yet, it's not reasonable (too idealistic) to expect the walls to be built first. Most software cycles are concerned with the Minimum Viable Product (MVP). When you're tasked with delivering a city, the client wants to see the city hall, not the city walls.
