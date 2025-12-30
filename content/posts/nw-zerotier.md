---
title: Hosting a Multiplayer game on a Private IP (SDN example)
date: "2021-08-01"
toc: true
showTags: true
slug: "zerotier"
tags:
- "networking"
- "games"
summary: "Zerotier - using SDN to allow hosting on a private IP"
---

> scroll below for a tldr;

## Game Hosting

Imagine you just downloaded Stardew Valley and wanted to host a multiplayer game. (Psst, I talk about Stardew Valley in my previous post.) You clicked on **co-op** and host a farm. Your friends do the same and are expected to enter an IP address - your IP address to be precise.

For most people, this method wouldn't work. This is because our computers are using private IP addresses, hidden behind NAT routers. Think of yourselves as prisoners, all locked up in cells. The only way your family can send you a letter is to address the letter to the prison premises. They write your name there, but they don't know which cell you're confined in. They're not allowed to know too, because the prison warden says so.

The prison warden collects the letters, and starts up the PC. She enters your details in, and the system prompts her with your cell number. She instructs her underlings to deliver the mail to you. Miraculously, without knowing the cell you were in, your family could send you that letter.

That's what a NAT router does. It converts private IPs to public IPs, but not just because it is a prison warden. Imagine if every prisoner got their own postal code. We'd run out of postal codes really quickly!

This article assumes that you have prior knowledge of what Stardew Valley is. If you don't, then you don't really want to continue reading here.

### Why you can't host on a private IP

Imagine yourself in that cell, and you want your parents to contact you directly. There is simply no way they can reach you because Everything that reaches you must pass through the prison warden. Even if they know your cell number, they put your name and cell number on the envelope. We now have a confused mailman because the cell number isn't a valid postal code on his books. That cell number is only valid to the prison warden.

### How to host on a private IP

Now, much alike Money Heist or Prison Break, you decide to pay someone to be your **Contact** with the outside world. The Contact is a friend of the warden. and can freely walk in and out of prison. The warden won't know he's carrying your secret letters.

But this Contact is more powerful than that. He has deals with a bunch of other prisoners in other prisons. So he needs his own system to remember all those names. He writes in his book - your prison, your cell number, and your name.

Why does he need your name? Because now, your parents can just tell the Contact your name, and your letters will be delivered right to you. All this while, your parents never walk into the prison to find you. The prison warden knows you're in touch with the outside world (because of the Contact's constant visits), but she doesn't know that your parents have already coordinated your escape.

### So who is the Contact? ZeroTier.

This is probably why you're on this article, so the Contact is ZeroTier One. You create a free account on their site and create your own network. You then get assigned a network ID.

1. Create free account
2. Create network and note the Network ID

Now, gather all your friends (and you of course) to download ZeroTier on your devices. You enter your network ID, and then you're all connected.

3. Download ZeroTier on device
4. Enter network ID on app

Sometimes, there are security settings you may have configured on the site. For each of your friends' devices, they get a node ID. You have to manually approve each node to join your network.

5. Go to ZeroTier site to approve nodes

Now you're almost done. Hit up `cmd` to bring up your terminal, and write `ipconfig`. You should see one of the network interfaces listed as a ZeroTier virtual network IP. It should start with `192.168.x.x`, which is a standard format for standard IPs. Note the IP address of the **Host** player.

Alternatively, you can also go to the ZeroTier site to check the IP address of the host.

6. Check the host's IP address on the ZeroTier website

Now, your friends can enter your IP address and connect to your Stardew farm.

7. On your friends' devices, enter the host IP address

### How does the Contact do it?

ZeroTier calls it Global Area Networking, but it's actually a virtual network achieved with SDN.
