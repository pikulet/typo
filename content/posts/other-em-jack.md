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

In the years of 2015 and 2016, I was very active on an online mafia site, [epicmafia.com]. Here, the sandbox players often load a script known as em-jack, written by @cub and constantly improved over the years.

One of the most popular features in the game is the master-slave module. Basically, users who enabled this mode could be made "slaves" of other players. Their masters would unlock powers to control how these slaves behave, such as:
* Choosing who the player will vote (to lynch)
* Choosing what the player will say

Suppose that I made player @ForestedHut my slave, here would be some sample commands I could enter to the chatbox and the expected results.

@ForestedHut eat

A random response appears, often drawing laughter at the degenerative nature of the responses.

![eat command](/media/em-jack-eat.png)

My edit featured more regex-sensitive commands, but the best feature I introduced was for the slave to escape from the master. Now, the code is as simple as setting the master value to null but the essence is that in the short lifespan of the script over multiple versions, this was never introduced.

Players often had to entirely disable the slave mode because the masters were being annoying, taking away a lot of fun from the game.

![free command](/media/em-jack-escape.png)

Because there was a wide variety of commands you could call on the slave, people would try out many commands, often met with a surprise at the deadpan response.

I definitely enjoyed tinkering with em-jack, but the entire script architecture definitely needs restructuring and some cleanup.

#### Remarks

The script can be found [here](https://gist.github.com/pikulet/be1c00aedb78c984ab62e395ecbcbbbb).

