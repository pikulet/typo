---
title: Poker AI Agent
date: "2019-05-02"
toc: true
showTags: true
slug: "poker-agent"
tags:
- "artificial intelligence"
summary: "Abstracting and modelling states when designing AI agents"
---

## Introduction

This project aims to build a poker AI agent to play a simplified form of limit poker. The poker engine used is [PyPokerEngine](https://github.com/ishikota/PyPokerEngine).

**Premise:**
- The agent has a function to decide which action to take (raise, call or fold) at every turn in poker. 
- The agent has access to the game state, such as the amount of money in the pot, the current hands and most importantly, the previous actions taken by the opponent. 
- The agent must make use of all the available information, and return the action it wishes to take.

### Abstracting Game States

Given the large complexity of poker, we need to apply abstractions to make it feasible to develop a poker agent. 

> This section deals with how we can simplify the model of the poker game. Abstraction and simplification often leads to some loss of data accuracy. However, as mentioned, it is more important to make big-picture decisions first.

**Card Isomorphism**

In poker, the suits of the card do not matter much. Having a King of Hearts with Four of Clubs is almost the same as having a King of Spades and a Four of Diamonds. Hence, the initial hand size of two can be stored in a table of size `13 x 13 = 169` instead of `50 choose 2 = 1326`.

![poker states](https://upload.wikimedia.org/wikipedia/commons/4/4a/Sklansky_Texas_Holdem_Starting_Hand_Strategies.JPG)

Card isomorphism is demonstrated in the photo above. A suited hand means that both cards belong to the same suit, offering a higher chance of completing a Flush.

**Card Bucketing**

Card isomorphism is insufficient to reduce the size of the game state space, so card bucketing is used. 

Instead of considering the many possible hands, we simply considered **5 buckets of cards (Very Strong, Strong, Average, Weak, Very Weak)**. Again, it does not really matter whether you have two Jacks and a seven or two Queens and a five. 

We used card win rate as the bucket key. Given a hand, we can estimate its winrate. We then allocate it a bucket depending on the winrate value.

Generating good card buckets is a topic of research that takes a lot of time to train. We circumvented this training time using a **Monte Carlo approach to generate the bucket margins**. In essence, we ran many random experiments such that the experimental data can give reasonably valuable numerical outcomes.

We randomly generated 1000 possible hands. For each hand, we ran them through a Monte Carlo simulation to retrieve a win rate value. We then calculate the win rate at the 20th, 40th, 60th and 80th percentiles. These were the values used to demarcate the buckets.

### Abstracting Player Behaviour

> This section aims to model player strategies in poker.

Poker is fundamentally a game about bluff. We can win with the worst hands if we are able to make our opponents think we have a good hand.

**Aggressiveness**

Given a strong hand, how much do you want to raise, or just call?

* Raising too aggressively hints to opponents that your hand is very strong, causing them to fold early (and reducing the pot size). This bluff technique aims to let opponents underestimate your hand strength.

**Tightness**

Given a weak hand, how much risk do you want to take, to raise/ call instead of folding?

* This bluff technique aims to let opponents overestimate your hand strength.

The poker agent can't read its opponents' *"poker face"*, but it can use past playing data to guess the opponent's play style. We used the opponent's play sequence (call, call, raise etc) to aggregate these attributes. 

Note that in the engine (as in regular poker), we do not know the opponent's hand when either player folds. However, in situations where we know the opponent's hand, we may use that in better predicting the opponent's bluff strategies.

### Importance of Random Behaviour

A predictable player would be easily countered. Instead of having determinate actions to take, our agent has a 3-tuple of probability that each action (raise, call, fold) would be played.

For instance, (0.8, 0.1, 0.1) means that the agent raises with probability 80%, calls with probability 10% and folds with probability 10%. With the exact same hand, our poker agent would not take the same action every time. 

This strategy is especially important with just two cards on hand, since there are only `169` states after applying card isomorphism. With sufficient games, it is not hard to predict a poker agent's behaviour for each of those states. For instance, we might not always fold even with the weakest possible hand. Similarly, we might not always raise with the strongest possible hand (we could just call).

### Aggregating the Data into an Agent

The simplest agent would just put all these values into a **linear combination** and optimise the weights. We were adventurous and wanted to evaluate the effectiveness of two learning techniques - **Counter-Factual Regret Minimisation (CFR Method)** and &&**Deep-Q Network Learning (DQN)**.

A CFR agent plays multiple games, and **observes its regret for different actions**. That is, given it had a bad hand, raised, and lost, it will regret raising at a bad hand. The agent then adjusts the probability for the actions, lowering the raise probability and increasing the fold probability.

In the long term, the agent wants to minimise the regret across all actions.
However, CFR agents take very long to train. There are multiple game states and it takes **too long to reach the equilibrium state**.

We then turned to the DQN methodology. The paradigm of DQNs parallels CFR agents: each action has an output value mapped to it. The results take a much faster time to approach equilibrium, which was favourable given our lack of training resources.

## Remarks

Developing a complex poker agent was definitely fun, and let me understand more about artificial intelligence. What does it really mean for a machine to be able to make decisions? What are the implications on human society?

A small aside, suppose that we managed to train and agent that could win humans at poker 90% of the time (we didn't actually achieve this feat). Does that AI *know* how to play poker? This thought is precisely the **Chinese Room Argument** in the philosophy of artificial intelligence.

A lot of our work was based on the exceptional work at the [University of Alberta Computer Poker Research Group](https://poker.cs.ualberta.ca/). Do check out their work!

Our report can be found [here](/docs/poker-report.pdf).
