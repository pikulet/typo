---
title: An Extended Mind (Andy Clark)
date: "2020-10-19"
showTags: true
slug: "perception-extended-mind"
category: "inquiry"
tags:
- "inquiry"
- "artificial intelligence"
summary: "What exactly constitutes the mind?"
---

> This was a joint presentation with [Lynette C.](https://www.linkedin.com/in/lynette-chia-99260620b/?originalSubdomain=sg). This article is very relevant to computer scientists interested in how we represent knowledge in AI.

In the previous week of class, we had learnt about how technological developments around us have changed the way we think. Examples of such technologies include timekeeping, writing and television. Andy Clark takes this claim a step further, claiming that **these technologies are integral to how we think**. 

## Action-Oriented Representation

Firstly, studies of perceptual adaptation suggest that they are motor-specific. The Thach experiment required participants to wear lenses which tilted the view of the dartboard sideways. Over the course of the experiment, participants were able to successfully adapt to the tilted dartboard. However, the experiment then asked participants to instead use their non-dominant hand to throw the darts. Interestingly, the **adaptation gained from the first experiment was not retained** in the second experiment. 

The Thach experiment then suggests that our internal neural representations are not action-neutral **descriptions** of the world around us. If we had learned to simply "tilt the dartboard back in our brains", then surely, when using the non-dominant hand, the dartboard in our brains would still be calibrated with the tilt. However, the experimental results show that perception, cognition and action are integrated together and **our inner representation of the world is constructed for us to act on it**. We represent the world based on how we can act on it.

Clark supports the theory of **action-oriented representations** with three claims. 

### Claim #1: We do not need a detailed inner model of the world

Daily agent-environment interactions often **do not require the construction and use of detailed inner models**.

Firstly, multiple experiments have shown how we often do not notice changes to unattended parts of our environment. A prime example would be the popular internet video of a "gorilla basketball" experiment. Participants are asked to count how many times the basketball is passed around during the video. Since all our attention is on the ball, we do not realise that a man dressed as a gorilla had walked across the screen.

Secondly, researchers have created a robot Herbert to collect soft drink cans. Herbert's programming did not involve any inner representation of the world. He was able to achieve his goal using the following routine:

- Detect obstacles --> he would halt and turn
- Detect table --> scan for cans
- Detect can --> rotate to face can, collect it

![Herbert](/media/perception-herbert.png)

### Claim #2: Actions can help improve perception

Low-level perception may “call” motor routines that yield better perceptual input and hence improve information pickup.

An example of this would be noticing something in your periphery, and **turning your body to get a better view** of what is there. In this manner, action is integral to the way that we perceive.

### Claim #3: Action supports cognition

Real-world actions may sometimes play an important role in the computational process itself.

![Art piece on depth illusion](/media/perception-depth.png)

In this illusion, the image we are presented with gives an illusion of depth. However, we can simply move our bodies to the left or right and the illusion will disappear. Then, our **motion was part of the cognitive process of depth perception**.

In the example of Herbert the robot earlier, Herbert would always rotate its body to face the drink can before picking it up. This motion allowed Herbert's picking up action to be more simplified, as the action is now deictically bound to having a drink can in front of it. Then, the motion is performing part of the cognitive work needed to pick the can up.

## Wideware

Now we know about the importance of action in neural representation. AI researchers have already successfully action-oriented such forms of mental encoding in robots. Maja Mataric once made a robot that navigated a maze, and the robot would encode landmarks in the maze using sensory input and its current direction of motion. 

The question then arises - we represent the world in an action-oriented way. Do we then **think in an action-oriented way?**

> Wideware: **External media** or **bodily actions** which are themselves performing cognitive or information-processing operations. The most common functions for wideware would be to store, search and transform information.

### Example 1: We store information in our environment

By having the option to write down something on a post-it, we free up some mental capacity to perform other sorts of computation. We can simply "write-down what's in our heads" because we have the ability to use language to symbolically represent our thoughts. 

These external props are useful to us because they have **temporal and spatial stability**. If a post-it note could randomly disappear, we wouldn't write on it. Referring back to Deacon's work, wideware indexically represents our symbolic thoughts. 

### Example 2: We manipulate and think using our environment

Off-loading information on external media isn't all that writing does. We use external media as a symbol-manipulating arena. For instance, we write a sentence, then go back to read it and re-organise it multiple times before coming up with the final iteration of our essays. It is not possible to write that finished form of the essay just by penning down what is in our minds. 

Writing in a way has changed the types of cognitive tasks that we perform. We **no longer just write, but also re-read and re-write**.

### Example 3: Action is cognition

This whole article is on Clark's work and here's a video of him [discussing this very paper](https://www.youtube.com/watch?v=kc-TdMjuJRU). At about the minute mark, he starts talking about the example of people being injected with **botox**, which makes the facial muscles rigid (it's normally used to make people look younger). The participants were then presented with emotive sentences. The study found that by not being able to make facial expressions (as we normally do in emotive sentences), participants were **slower to understand the sentences**.

By not being able to act, participants were not able to think. (This really puts a new twist on what it means to act before you think.)

### Example 4: The cognitive machine includes the environment

The biological build of a bluefin tuna does not explain how it is able to swim so well. Researchers finally cracked this puzzle when they studied bluefin tuna in their natural environment. It is now known that **bluefin tuna make use of the eddies and vortices in the water to gain speed**. Then, the real swimming machine is not the bluefin tuna, but the bluefin tuna in its proper environment. 

The mind is an essentially **situated** brain: a brain at home in its proper bodily, cultural and environmental niche.

## Extended Mind Theory

With wideware, there is an **active externalism of the mind**, as we extend our cognitive processes into the physical world. 

A prime example would be how Alzheimer’s patients rely on the cognitive scaffolding afforded by wideware, such as with:

- Labelling objects in the house
- Memory books with annotated photos of friends and relatives
- Diaries for tasks and events
- Compensating for biological limits on cognition

When we remove this wideware, we are not just interfering with the environment, but **interfering with the person**.

## Further Discussion

* (Tomasello) What role can wideware play in cumulative cultural transmission?

* Is the internet part of my mind? Your mind? Our mind?

* What are some ethical consequences of the extended mind theory? Example: “Petty crimes” like theft of a diary containing memories

* (Postman) Postman claimed that we are exposed to so much information that is not actionable. How do we represent information that is not action-oriented? What are the consequences of not being able to encode information in an action-oriented manner?

## Remarks

This project was very fun to work with. The full presentation can be found [here](/docs/extended%20mind.pdf).
