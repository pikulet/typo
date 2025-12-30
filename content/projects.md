---
title: "Projects"
template: "page"
---

Check out more on [GitHub](https://github.com/pikulet)!

### Roolet
**reactJs discrete event visualiser** ([Demo](https://roolets.netlify.app)|[Blog Post](/posts/roolet)|[Repository](https://github.com/pikulet/roolet))

![roolet](/media/roolet.png)

Full-stack ReactJs site that visualises betting outcomes (pmf, cmf) in xkcd-like graphics. Inspired by Roulette.

### Synacore
**Virtual machine for assembly code** ([Repository](https://github.com/pikulet/synacore))

![synacore](/media/synacore.png)

Implemented an object-oriented VM that can read assembly code. Includes memory, registers, stack, function calls, jumps and an ALU. This project is for the [Synacor Challenge](https://challenge.synacor.com/)

### Pomenohenn
**Retro word game in Python, Pyxel** ([Repository](https://github.com/pikulet/phenn-pyxel))

![pomenohenn](/media/phenn-pyxel.png)
Created a retro word game (limited to 256x256 pixels!) in Python, Pyxel. The inspiration was from a Cambridge article on how we are able contextually understand mispelled words, as long as the first and last letters remained in place.

### FlaskShort
**Full-stack URL Shortener in Python** ([Repository](https://github.com/pikulet/flask-short))

![flask short demo](/media/flask-short-demo.png)
A URL shortener with a complete backend system, using Flask, FlaskBootstrap, PostgreSQL.

### Ghost
**Python package for a word game** ([PyPi Package](https://pypi.org/simple/ghost-word-game/)|[Repository](https://github.com/pikulet/ghost))

Created a Finite State Machine Game Engine that can be used by various applications (web, mobile).

### Dynalite
**Internet-of-Things using RaspberryPi and CoAP** ([Demo](https://evantay.com/projects/#dynalite)|[Repository](https://github.com/pikulet/dynalite)|[Presentation](/rpi.pdf))

![dynalite](/media/dynalite.png)
Created a light-detection system to retrieve data on room occupancy rates. Finds available study spaces in school. I worked on the RaspberryPi module, using CoAP (Constrained Application Protocol). CoAP is a lightweight http-like protocol for use in IoT devices with limited bandwidth (this will soon be resovled with 5G).

### tcptrace
**Traceroute in TCP using C** ([Blog Post](/posts/tcp-traceroute)|[Repository](https://github.com/pikulet/tcptrace))

![tcp traceroute](/media/tcp-traceroute.png)
Created a primitive traceroute in TCP. It can tell you which routers your data goes through before reaching your destination.

### Intellex Search Engine
**A weighted tf-idf information retrieval system** ([Repository](https://github.com/pikulet/intellex))

![diagram](/media/intellex.png)
Created a search system for legal documents (data by Intellex). I worked on the indexing portion, as well as creating APIs to access the indexed data. Having worked with the legal data let me understand the sheer complexity of legal information retrieval. Different court systems, different document formats and different terminology used are just some problems plaguing the legal industry.

### semacrawl
**Multi-threaded web crawler using semaphores** ([Repository](https://github.com/pikulet/semacrawl))

A simple database-free web crawler using semaphores.

### Pose Estimator
**DSTA TIL Artificial Intelligence Hack 2019** ([Blog Post](/posts/dsta-til-hack)|[Repository](https://github.com/pikulet/til-ai-camp)|[Slides](/pose-estimator-slides.pdf))

Trained a pose estimator in Tensorflow/ Keras using Transfer Learning and the ensemble method. Won the 6th place in the competition (Merit Award), out of 50+ teams

### Poker Agent
**Artificial Intelligence** ([Blog Post](/posts/poker-agent)|[Report](/poker-report.pdf))

![poker](/media/poker-snapshot.png)
Combined the concepts of CounterFactual Regret (CFR) Minimisation and Deep-Q Networks (DQN) in a poker agent. 

### Concierge
**Command-Line Hotel Management Application** ([Repository](https://github.com/pikulet/concierge)|[Project Portfolio](/concierge-portfolio.pdf))

![concierge](/media/concierge.png)
This project was morphed from a 10kLoC address book application in Java. The system has an MVC architecture. I created a login system using SHA256 hash to protect the password. This feature involve creating a new command, a login manager, and password storage.

### Healthcare Queuing Application
**Android App to manage queues at NUS UHC** ([Repository](https://github.com/pikulet/orbital-halp))

![halp](/media/halp.png)
Created an android prototype that allows NUS students to take a queue number without being physically present at the clinic. The project is now outdated as we integrated to the NUS system using the old IVLE LAPI. NUS has since migrated to LumiNUS.