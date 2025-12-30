---
title: Synchronisation with Semaphores
date: "2019-12-30"
toc: true
showTags: true
slug: "triple-semaphore"
tags:
- "programming"
summary: "How to give one process priority access to a semaphore"
---

## What are Semaphores?

Semaphores are synchronisation primitives used to protect a critical section of code. The idea is that only a controlled number of processes (usually 1) can enter the **critical section**. Usually, this involves some kind of modification of data and multiple threads executing the section simultaneously could lead to a **race condition**. An analogy would be a class of students shouting their names at the same time. In the end, the teacher almost got nothing out of it.

Binary semaphores work by have a process `wait` to indicate that it is in the critical section (CS), and `signal` to indicate that it is done being in the CS.

Suppose we have a semaphore N, and two processes A and B. Each of A and B would run like this:

```
wait(N)

// critical section

signal(N)
```

When either process A or B calls `wait` on the semaphore, the other process is **blocked** at the `wait` until the process in the critical section releases the semaphore using `signal`. Now, there are numerous classical problems already detailing the problems that arise from using synchronisation involving waiting, such as deadlocks and livelocks. This will not be the focus of this blog post.

## Priority access to Semaphores

Suppose I have 10 processes running the same program as A, and another 10 processes running the same program as B. When all these 20 processes run, the semaphore grants access to any process that is blocked at `wait` - that is, there is **no queue or priority being set**.

Example:
- A1 is in the critical section, and A2, B1 and B2 are blocked at `wait(N)`.
- There is no guarantee of which process will enter the critical section after A1 calls `signal`.

How can we give processes of type B to be given priority access to the semaphore?

### Solution

This is a 3-semaphore solution.
- Semaphore N, the original semaphore as above
- Semaphore H, a semaphore for high-priority access
- Semaphore L, a semaphore for low-priority access

Then, the following works as a priority gate to filter between A and B.

Type B (**high priority**):
```
wait(H)
wait(N)
signal(H)

// critical section

signal(N)
```

Type A (**low priority**):
```
wait(L)
wait(H)
wait(N)
signal(H)

// critical section

signal(N)
signal(L)
```

In particular, at most one low-priority process can be blocked at `wait(H)` because of `wait(L)`. However, this doesn't guarantee that high-priority processes can always run before low-priority processes. The actual behaviour depends on thread-level scheduling. If the scheduler always lets processes of type A (low priority) run first, then there would be no priority access achieved.

The high-priority semaphore is actually optional. With just L and N, the code is the **turnstile problem** with writer priority.
