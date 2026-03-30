---
title: The Collaborative Nature of Computer Science
date: "2021-05-20"
showTags: true
slug: "reflection-collaborative"
tags:
- "inquiry"
- "reflection"
summary: "Two angles of the same project. Part 3 of the Reflection series."
---

As an introverted person, having the space to focus on challenging problems was ideal. This solitary aspect of programming drew me to Computer Science. I recall my second semester in NUS, where my friends would frequently meet up in the lounge to discuss the assigned programming problems. I would often reject their invitations and stay alone in my room to work on the problems, believing that it was important to do the work myself so that I would be able to learn.

Yet, Computer Science is more than just solving small problems alone. There is often a need to work with a multitude of people with different expertise to put together the large-scale systems that we see today.

## Separation of Concerns

Imagine having to co-write an essay with 99 other people. The logical thing to do would be to split the essay into various sections and assign smaller groups of people to each section. There can be some people overseeing the big picture, but most people will end up doing a lot of work on one specific section. This same process applies to software projects, as I had learnt in the software engineering principles module.

![CS2103 Notes](/media/usr-p3-soc.png)

*My notes from CS2103 Software Engineering.*

An important idea in managing software projects is the Separation of Concerns (SoC) principle. The Separation of Concerns principle is the idea that between software components, there should be as few dependencies as possible. Often, each component functions as its own silo and only interacts with other components via interfaces known as Application Programming Interfaces (APIs).

With these interfaces, it was possible to interact with someone else's code without knowing the implementation details. I would only have to let my team know what my code does, omitting details on how my code works. By separating our concerns, each programmer is able to devote their attention to one specific aspect of the code. Without everyone making changes in different places of the code base, the software as a whole is easier to maintain.

One of my most memorable projects in NUS involved a hotel management application. As recommended by the SoC principle, we were all working on our own components that did not affect each other’s work. However, we would have to review each other’s work before uploading the changes. This review process often involved discussions on how we should write code. However, just as in writing, there are multiple styles of programming and each person has a personal preference for such a style. Sometimes, these comments can feel trivial since they do not affect the rest of the project.

![CS2103 Review Received](/media/usr-p3-review-recv.png)

*A review comment I received. My teammate is suggesting me to combine lines 21 and 22 together. The intended code was sb.append(LogInCommand.COMMAND_WORD).append(“ “).*

![CS2103 Review Given](/media/usr-p3-review-gave.png)

*A code review comment I gave. Here, I ask my teammate to change the value “1” in line 95 to a variable named SINGLE_ROOM for extensibility.  Firstly, it would be easier to read since "capacity of 1" is semantically a SINGLE_ROOM. Secondly, suppose that the hotel chooses to change the capacity of rooms like the Deluxe Room, the capacity value only needs to be changed in one place.*

At times, the changes suggested can be rather subjective, requiring a balance between readability and functionality. I got frustrated at receiving these comments, but was even more frustrated that I felt the need to give such comments. By following the SoC principle, adhering to the interface definitions is the only convention a person really needs to follow. If our work was truly isolated, does a small thing done in one person’s code matter in the grand scheme of the project?

## Learning from how our brain works

This frustration already hinted that there were some problems with the way I was interpreting the software engineering principle. I was not able to pinpoint what my misconception was, until I took a USP module on perception. In the class, we learnt about how various parts of our body worked together to enable us to see the world around us. One of the interesting theories we talked about was Edelman’s Theory of Neuronal Group Selection (TNGS).

![TNGS Notes](/media/usr-p3-tngs.png)

*My notes for the module test. The thalamo-cortical system in our brain integrates the various specialist cells for perception.*

Using ideas from information theory, Edelman argued that the most useful and efficient brain would need to fulfil two requirements. Firstly, the cells must be highly differentiated, and each cell type would only do one specific task like linguistic processing, auditory perception, or visual perception. This specialisation would allow the cells to be truly good at what they are doing.

However, true brain functioning is not just about perception, but action-oriented perception. Survival requires us to act on what we perceive, and not just collect a lot of information about our environment. The second piece of Edelman’s puzzle is that the different brain components need to communicate with each other in highly recursive loops. Could this high-integration concept be applied to software engineering and bring about benefits like we see in brain functioning?

## Relating Edelman's TNGS to Separation of Concerns

There seems to be an apparent conflict between these two ideas, where Edelman’s theory supports extensive communication between components, while Separation of Concerns supports minimal communication between components. However, I realised that they are complementary. In software projects, there are two ways to divide code: by component and by feature. Components are the developer's view of the code, whereas features are what users see.

![CS2103 Components](/media/usr-p3-components.png)

*Diagram of components in the hotel management application.*

![CS2103 Features](/media/usr-p3-features.png)

*List of features in the hotel management application. The highlighted features were done by me. In the project, we allocated the work based on feature.*

On their own, the features we developed were isolated. It was possible to remove any feature without impacting the others. On their own, the components of the software were isolated and could only interact with each other via limited interfaces. However, the nature of the project was not isolated at all. The tables below illustrate this idea.

![Visualisation of Project (Before)](/media/usr-p3-t1.png)

Relation between components and features in a software project. Initially, I was mentally structuring the project as vertical silos, where each of us was working on our own feature.

![Visualisation of Project (After)](/media/usr-p3-t2.png)

However, I could view the project in another manner - horizontally. Regardless of the feature being developed, there was a need to work on the various software components.

I had only seen the vertical silos of the project, where each of us was working on different features. However, I failed to see how we were connected when viewing the project horizontally: we were working on the same components. Separation of Concerns was a principle arising from software architecture, not project management. It was meant to apply to components (UI, Logic, Model, Storage) and not features (done by different people).

In a software project, cohesiveness is important to ensure that we do not modify the components in a way that affects other users. Even when we were deciding on what features we wanted to develop, we had to ensure that our features were complementary with each other. The review process, while seemingly trivial, was important in enforcing code conventions and a consistent style across the whole project. This way, our code remains readable and understandable to everyone in the team, keeping our work open to feedback from each other.

## Moving Forward: Larger Projects, More Collaboration

Separation of Concerns is from an old model of software architecture, where the design was more monolithic. In such systems, large chunks of code are often put together, making the code difficult to understand. Then, there is a need to clearly delineate different functionalities and responsibilities.

However, recent software architectures are moving rapidly towards ‘agile’ structures. In these architectures, code is already structured in smaller components (such as UI, Logic, Model, and Storage in my hotel management project above). Then, there is a need to transfer the focus to more collaborative elements in software engineering. The collaborative elements apply not just to the software project, but also to the team dynamics.

My initial misconception of the software engineering principles caused me to feel frustrated at my group projects. As I transition to the workplace, the software systems involved will only get larger and there will be more people involved. It is more important than ever to keep in mind the Separation of Concerns principle, but also vital to know at heart that we are not silos in developing software.
