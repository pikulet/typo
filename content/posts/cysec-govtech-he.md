---
title: Homomorphic Encryption
date: "2020-08-05"
showTags: true
slug: "homomorphic-encryption"
tags:
- "cybersecurity"
- "cryptography"
summary: "An internship on Homomorphic Encryption"
---

## Internship Review

This summer, I had the opportunity to join the GovTech Cybersecurity Group. I was paired with my mentor from the GovTech Girls In Tech Programme, and that really helped me tide through the work-from-home internship because at least I knew someone!

I self-proposed my internship topic, and that process made me think from the perspective of the management. What kinds of projects are worth investing in?

In the end, I decided on the topic of Homomorphic Encryption. I did the usual reading up on what it is and identified key areas of interest where applications could be developed. I then started out developing an application using the [Microsoft SEAL BFV Library](https://github.com/microsoft/SEAL).

One of the key concerns surrounding Homomorphic Encryption technology (on top of its esoteric nature) is that it's extremely impractical. As a result, my project ended up doing a lot of performance analysis to measure running time, disk usage and network usage in practical homomorphic encryption applications.

Nearing the end of my internship, I was invited to share about the topic with more than 150 staff from the department. Many were very curious about the technology, and I received questions about how HE would align with other major technologies like blockchain and machine learning.

All in all, GovTech is a really cool place to spend a summer at. I only wished that the internship could take place in-person so that I could get to meet more people and experience the culture there.

## Introduction to Homomorphic Encryption

Homomorphic Encryption is a **Privacy-Enhancing Technology** that can achieve Data Privacy. It's a pretty new technology developed in the last 30+ years, and there are currently limited commercial applications due to lack of specialist knowledge and industry standardisations. In recent years, tech leaders (IBM, Google, 
Microsoft) are pushing for their widespread use.

HE is fundamentally different from the current encryption systems like `RSA` or `AES`. Interestingly, HE is quantum-resistant. With the realisation of quantum computers, we can apply **Shor's Algorithm** to solve the factorisation problems that make `RSA` secure. There is no known quantum algorithm to break HE (yet).

### What is Homomorphism?

In group theory, a **homomorphism** is a property-preserving function of the following form:

```
Enc(a) + Enc(b) = Enc(a + b)
```

![Homomorphic Encryption: Two Paths](/media/he-homomorphism-paths.svg)

The two operations `(Enc, +)` are said to be homomorphic if we can reverse their order of application and achieve the same output result. A simple example of a homomorphic function is "multiply by two/ Double".

```
Double(a) + Double(b) 
= (2 * a) + (2 * b)
= 2 * (a + b)
= Double(a + b)
```

Of course, the double function is not an encryption function here.

### Computations on Encrypted Data

With HE, we can run computations on encrypted data. This possibility is useful in the real world, where one company might own the data (e.g. a hospital with medical data), and another company owns the algorithm to analyse the data (e.g. a tech company). Both parties would generally be unwilling to share what they own with each other, and the conflict can be resolved with HE.

We can apply HE to **healthcare analytics**, **encrypted search** (where we only index encrypted documents) and in the end-to-end verifiability of **e-voting** (elections can be audited without revealing individual votes).

![HE Usefulness in Private Analytics](/media/he-healthcare-example.png)

Unfortunately, HE is significantly slower than existing encryption solutions and it is not **CCA-Secure** (see the next section).

### Chosen-Ciphertext Attack (CCA) Secure

Since the encryption function is eponymously homomorphic, adding any two ciphertexts `A` and `B` together will result in a valid ciphertext `C`. This property-preserving function leads to the problem of **ciphertext malleability**. Given the ciphertexts of `A, B and C`, attackers can discover that `C = A + B`. Attackers know the relationship between the ciphertexts. Additionally, attackers can modify ciphertexts in predictable ways, that also modify the plaintext (e.g. flipping a certain bit to the ciphertext also flips the same bit in the plaintext).

Note that in this scenario, the actual value of `C` is still protected since actual values of `A` and `B` are not known. However, if the attacker could somehow obtain these values, then the encryption scheme is compromised.

To circumvent this problem, data owners need to ensure that the **raw data cannot be 
easily accessible**. However, modern microservice applications can be very complex and include multi-party communication. Rich data flows could lead to inadvertent data leaks. Nevertheless, HE by itself is still safe if it was purely one client outsourcing the computations to one server.

Besides not being CCA-Secure, HE **does not provide any integrity checks**. The attacker can simply double every data point using homomorphic operations, changing the results. Currently, the only solution is to use canaries to detect these modifications. By randomly inserting dummy data points, we can check if these data points were maliciously tampered with.

## Developing applications with HE

HE refers to a broad class of encryption systems, including:

![HE Comparison](/media/he-comparison.png)

- **Partially HE**: Some systems are only homomorphic for addition only or multiplication only, but not both
- **Somewhat HE**: Some systems only support a limited number of times operations can be done
- **Fully HE**: The most theoretically correct but also not practical to use

Some common HE schemes include `DGHV`, `BGV`, `BFV` and `CKKS` (these named after the researchers who developed them). We can decide on a scheme based on the data type and 
operations needed. For instance, `CKKS` is an approximate scheme that supports decimal 
operations.

### Brakerski/Fan-Vercauteren (BFV)

During my internship, I worked specifically on the BFV scheme, which is one of the more commonly-implemented HE schemes. Its security premise is based on a computationally hard problem known as the **Ring Learning with Errors (RLWE)** problem. BFV can support both asymmetric (public-key) and symmetric encryption.

![HE Noise Threshold](/media/he-threshold.png)

The BFV encryption process works by adding noise to messages. Without the key, it is difficult to decrypt the data. However, during the computation process, the noise will grow. 
- Adding two ciphertexts causes negligible growth
- Multiplying two ciphertexts causes the noise to grow fast (the product of the two noise levels)

Once the noise exceeds a threshold value, it becomes impossible to correctly decrypt the message. A trick employed to "reset" the noise is known as **bootstrapping**, where a message is decrypted and then re-encrypted (sort of). More specifically, an encrypted key is used to evaluate the decryption in the ciphertext space (i.e. homomorphically), making this reset operation very expensive.

### Analysis

After experimenting and doing performance analysis on this scheme, here were some findings:

**Space Consumption**

![HE Practical](/media/he-practical.png)

There was an impractically large increase in the space consumed by the encrypted data. Unencrypted integers took just `4` bytes of space, but that single digit encryption would take `100k` bytes. While I did not verify if the growth is linear for large numbers, it is still concerning for large data sets of single-digit data.

**Limited Practical Use**

- BFV only allows for mathematically primitive operations like addition and multiplication to be done. It is expensive to piece together these operations to achieve complex functionality for use in data analytics and machine learning.
- The data owner has to do the encryption and decryption of the sensitive input by themselves. This operation is expensive and would consume the owner's own resources. It's a trade-off between spending resources on encryption versus spending on computation and analytics.
- Microsoft's SEAL BFV in particular is a rather low-level library working with polynomial operations. Developers need to have an understanding of how to represent the data (integers, text) in polynomials. BFV parameters also have to be picked beforehand, based on the expected computation results - a skill not easily accessible to new developers.

## Remarks

Overall, Homomorphic Encryption techniques like BFV are still nascent and research-level techniques. Many fundamental issues have to be resolved first, such as making basic operations faster and cheaper.

The ultimate goal with BFV is to create data-agnostic software with generic analytics capabilities, where you can input any type of data set and get meaningful output.

My presentation slides can be found [here](/docs/homomorphic-encryption-ppt.pdf).
