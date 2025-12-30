---
title: Articulating Kubernetes
date: "2021-06-30"
showTags: true
draft: true
slug: "kubernetes-intro"
tags:
- "kubernetes"
summary: "A self-note of basic concepts in container orchestration"
---

Docker is merely the first step in the containerisation industry, and users of docker will know that operating docker manually is cumbersome and not scalable.

Furthermore, systems often require multiple tasks to be deployed. For instance, I might want to run a task with multiple configuration files. Running all these tasks merely using docker would result in me having to manually create containers and check that they are running. 

This is where kubernetes comes in. It's a container orchestration tool that allows us to easily deploy many tasks, and check that they're running well. I'll list some important concepts in kubernetes.

#### Custom Resource Definition

Kubernetes tasks by themselves can be named however you want, via `custom resource definitions` (CRDs). For instance, I can create a CRD for MyTask, specfiying the configuration format based on the task needs. I can them use a command like 

```bash
kubectl get MyTask
```
	
which will list MyTask-config-A, MyTask-config-B and MyTask-config-C.

#### Pods

However, when the tasks run, they end up running in units called **pods**. You can think of pods as an isolated environment, something like a virtual machine, for every task to run. So config-A writing to /tmp won't affect config-B writing to /tmp if they both run in different pods.

```bash
kubectl get pods
```
	
Pods, however, are not the smallest unit of isolation. A pod can contain multiple **containers**, each running separate docker images. For instance, MyTask could require three binaries interacting with each other in the same environment, so we configure it to start three containers in the same pod.

Kubernetes also allows us to easily get pods logs, provided that we have integrated our service well.

```bash
kubectl logs -f $pod_name
```

#### Nodes

Nodes are the machines where the k8s agents run, and each node can have multiple pods being **scheduled** to it by `kube-scheduler`. For instance, one production problem might be a faulty NIC tied to one node, causing all the pods on that node to have network failures.

```bash
kubectl get nodes
```
	
You can check which nodes have faulty statuses, and they disable scheduling to the nodes.

```bash
kubectl cordon node1
```

#### Clusters and Namespaces

One kubernetes **cluster** can have multiple **namespaces**. One cluster is associated with one set of nodes. 

Namespaces are isolation techniques used, for example the namespace `test` might be used for testing only, which the namespace `production` would contain the important tasks. However, as mentioned above, **all namespaces in the same cluster share the same nodes**. 

Sometimes, we want to partition tasks between nodes, which namespaces cannot achieve. We can instead utilise node **labels** and pod **affinities**, selectively allowing pods to be scheduled on different machines.

#### kubectx/ kubens

To identify the specific cluster and namespace we want to work with, we would have to enter a command like

	kubectl --kubeconfig=cluster1 get pods -n namespace1
	
The command is rather clumsy, and repetitive to type when we are operating over the same cluster and namespace for an extended period of time. This is where the tool `kubectx` comes in. With `kubectx` and `kubens`, we can easily change between contexts (clusters) and namespaces respectively.

An example of the changed workflow:

	kubectx cluster1
	kubens namespace1
	kubectl get pods