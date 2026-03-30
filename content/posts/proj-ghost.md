---
title: Asymmetric proof of knowledge (ghost)
date: "2021-01-01"
showTags: true
slug: "ghost-2"
tags:
- "games"
summary: "Multiplayer telegram bot game"
---

Ghost is the name of a project my sister and I are working on together. We're implementing this word game on telegram, each working on independent components. So far, I've done up the skeleton for the backend engine in Python. My sister is working on the bot-user interactions, making use of my backend Python package.

## How is the game played?

The game involves three roles, Townies, Fools and the eponymous Ghosts. In mafia terms, the Townies and Fools are the good guys, while the Ghosts are the *bad* ones. The good guys will all get a word, with the Townies all getting the same word (e.g. `angel`) and the Fools all getting the same word (e.g. `demon`). The Ghosts have no word, and their goal is to guess the word that the Townies are hiding. As in usual mafia, the objective of the townsfolk would be to eliminate all the Ghosts.

The idea of the game is that you have to prove that you know the word, without letting others know what the word actually is. Sounds familiar? This concept manifests in many security primitives like cryptographic hashes of passwords! Anyhow, here's a sample game with 3 Townies, 2 Fools and 2 Ghosts.

![Ghost Clues](/media/ghost-clues.png)

- Townie 1: `wings`
- Townie 2: `protector`
- Townie 3: `michel` (a word play that references michelangelo :P)
- Fool 1: `evil`
- Fool 2: `dan brown` (a reference to angels and demons, one of his most popular novels)
- Ghost 1: `good` (blends in by giving a clue based off what others have given)
- Ghost 2: `storybooks` (he mistakenly guesses that the word is related to novels because of Fool 2's clue)

Based on these clues given, everyone alive then votes (by majority) who should be killed. Interestingly, Townie 2 may think that Fool 1 is not on the good team because the clue totally doesn't match his word! Fool 1 can't just claim that he's a Fool because - here's the catch - Fools don't know that they are Fools and will appear to themselves as Townies. 

For the five people on *the good team* that got a word, they have to figure out if they are a Townie or a Fool, and to eliminate the Ghosts! Likewise, the Ghosts need to convince the Townies / Fools that they do know the word. Their goal is to use the time to either lynch the good people, or gather more information on the secret words.

![Ghost Workflow](/media/ghost-workflow.png)

After a discussion phase, someone is lynched. At this point, their actual role (Townie/Fool) is revealed. Using this knowledge, they can better identify who is on their own team. If a Ghost is lynched, then they get to make a guess of what the word is. 

Would you have guessed `angel` given the first three clues? It's much harder than that because the Ghosts only know that there are five clues. They don't exactly know which clues are for the Townie / Fool word, and have to infer all this information based on the ongoing discussion.

## Remarks

The game is really simple, and there are distinct phases that happen, so I implemented the engine in a Finite State Machine style. One thing I'm hoping to do is to write a Golang web server (using gin!) and the CPython API to interact with my Python backend engine. This means that the Python package has to be agnostic to the designs of telegram bots, something that I made sure to keep in mind.

The Python package can be found on [GitHub](https://github.com/pikulet/ghost-word-game), or [PyPi](https://pypi.org/simple/ghost-word-game/). I'd also recommend taking a look at my sister's implementation of the telegram bot [here](https://github.com/pikulet/ghost-bot).
