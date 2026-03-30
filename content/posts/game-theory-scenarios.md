---
title: Interactive Decision Theory
date: "2022-12-20"
showTags: true
slug: "game-theory-scenarios"
tags:
- "game theory"
- "recreational mathematics"
summary: "An introduction to common scenarios in game theory"
---

I recently picked up a book at the library:

> Gladiators, Pirates and Games of Trust by Haim Shapira

The book covers some interesting concepts and problems in game theory, and how these scenarios play out in real-life negotiations. It does not go into a lot of detailed explanation, but it's a great starter for the topic. A host of problems are covered in this book, including: The Prisoner's Dilemma, Stable Marriage Problem and Gale-Shapley algorithm, the irrelevance of order in the Gladiator game, and Evolutionarily Stable Strategies.

I've written down a brief of the problems that intrigued me below.

## Nash Equilibrium

A Nash Equilibrium is a set of strategies such that players will not regret their decisions once the other strategies are revealed. It's interesting that these equilibria are not necessarily the set of strategies that give players the most optimal outcomes. 

In the case of the Prisoner's Dilemma, the Nash Equilibrium is for individuals to make the egotistical decision to betray their opponent. The net effect for both players is strategically unwise, and both players would be better off if they collectively decided to play against their own interest.

![Prisoner's Dilemma payoff matrix showing the Nash Equilibrium at Defect/Defect](/media/prisoners-dilemma-matrix.svg)

## The Blackmailer Paradox

> In the Blackmailer Paradox, two players have to agree on how they should split a sum of money (within a time limit). Else, both players get nothing.

Just by playing the game, players have already won. The collective effect on both players is that they never lose any money. However, players might be more willing to "prove a point" and walk away with nothing than to walk away with the short end of the stick.

Rational players should agree to split halfway. Technically, the Nash Equilibrium is for the first player to wait for the last minute and then blackmail the second player with the minimum possible amount (e.g. $1). The second player must accept the offer, or they end up with nothing.

Yet, players may be irrational, going for an all-or-nothing scenario (give me 90% or I'd rather walk away with nothing!). When playing against an irrational player, it's more optimal to act irrationally as well. Reminds me a little of multiplying two negatives to get a positive.

### Ultimatum Game

The Ultimatum Game is a variant of the Blackmailer Game, where one of the players ***proposes*** the split and the other player merely ***responds***. There is a limited number of proposals that can be made.

An interesting effect is that responders who know the total amount being split might play irrationally. As a responder, you will gladly accept `$100`, but upon knowing that the total was `$10000`, you might feel indignant and reject the offer.

![Ultimatum Game decision tree showing proposer offers and responder choices](/media/ultimatum-game-tree.svg)

## Chomp

Chomp is a famous chocolate-eating game, where the opening player is known to have a winning strategy. However, the proof-of-existence is non-constructive (meaning this strategy is not specified). A similar experiment would be the game of Nim.

![Chomp game board showing a 5x4 chocolate grid with a poisoned bottom-left square and an example chomp move](/media/chomp-game-board.svg)

I recall being fascinated by this game in middle school, where we'd crack our heads at this [site](https://www.math.ucla.edu/~tom/Games/chomp.html). No matter how much I played, I could not outsmart the AI. 

An idea struck that I should let the AI play against itself. I'd chomp the corner square and let the AI have the next turn. Then, no matter how the AI moves, it would be possible to replicate both my move and the AI's move in one turn. I'd then start another game session with that move, effectively letting the AI respond to its own algorithm. This strategy would continue until one of the instances wins.
