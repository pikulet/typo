---
title: emjack tampermonkey (newbie to programming)
date: "2017-01-05"
showTags: true
slug: "customising-scripts-em-jack"
category: "tinker"
tags:
- "programming"
summary: "Tampermonkey script for Epicmafia (em-jack)"
---

In the years of 2015 and 2016, I was very active on an online mafia site, [epicmafia.com]. Here, the sandbox players often load a script extension known as em-jack via Tampermonkey (a browser extension to inject custom JavaScript on any site), written by @cub and constantly improved over the years. em-jack had UI tweaks and client-side minigames, bringing a fun twist to the game.

One of the most popular features in the game is the master-slave module. Basically, users who enabled this mode could be made "slaves" of other players. Their masters would unlock powers to control how these slaves behave, such as:
* Choosing who the player will vote for (to lynch)
* Choosing what the player will say

Suppose that I made player @ForestedHut my slave, here would be some sample commands I could enter to the chatbox and the expected results.

`@ForestedHut eat`

A random response appears, often drawing laughter at the degenerate nature of the responses.

![eat command](/media/em-jack-eat.png)

My edit featured more regex commands, matching more variants of a particular word. But the best feature I introduced was for the slave to escape from the master. The code change was as simple as clearing the master value, but in the short lifespan of the script over multiple versions, this was never introduced.

Players often had to entirely disable the slave mode because the masters were being annoying, taking away a lot of fun from the game.

![free command](/media/em-jack-escape.png)

Because there was a wide variety of commands you could call on the slave, people would try out many commands, often met with a surprise at the deadpan response.

I definitely enjoyed tinkering with em-jack, but the entire script architecture needs restructuring and some cleanup. Looking back, this was my first taste of reading and modifying someone else's code -- a skill that would become most of my job as a software engineer.

#### Remarks

The script can be found [here](https://gist.github.com/pikulet/be1c00aedb78c984ab62e395ecbcbbbb).
