---
title: Gambling and Data Compression
date: "2020-04-30"
toctoc: true
showTags: true
slug: "gambling-info-theory"
tags:
- "information theory"
summary: "Using an information-theoretic perspective to understand horse races"
---

# Information Theory

Information Theory is a field concerned with how much information certain events can reveal. In general, events with more **uncertainty** reveal more information. The aggregated amount of uncertainty is called **entropy**.

If variable `A` can hold the values of `a₁` with probability `0` and `a₂` with probability `1`, then we know with absolute certainty that variable `A` will take on the value `a₂`. Whether the event has occurred or not, we do not learn any new information. Hence, the entropy of this variable is zero.

On the other hand, if variable `B` can be `b₁` or `b₂` with equal probability, then it would have the highest average entropy. The occurrence of the event basically gave us an advantage in a 50-50 scenario.

In essence, entropy is a measure of the amount of uncertainty in a system. A system with more entropy can reveal more information.

## Usefulness of Information Theory

Information Theory is relevant to a lot of fields, but I will explain two bigs ones - Machine Learning and Cryptography.

### Machine Learning

Consider an algorithm that aims to classify if an image is a cat or dog. The result is stored in the random variable `X`. Without any prior information, the amount of information in `X` is exactly the same as the distribution of cat and dog images on the internet. 

However, if we have some training data, then we can instead consider the conditional entropy of the prediction outcome `X` given the data. An algorithm that works well would aim to minimise this entropy in `X` using more relevant training data and methods.

By measuring the uncertainty in the prediction outcome `X`, we can better devise algorithms that aim to reduce the uncertainty in prediction models. Information Theory then is used as a benchmark for machine learning models.

### Cryptography

Encoding and decoding bits is at the core of information theory. Given a message like "hello, welcome to this site". How many bits do we need to encode it such that
- the receiver can correctly decode the message
- the message is resistant to errors in the channel, such as incorrectly-transmitted Morse code?

The answer depends on the entropy of the language of transmission, in this case English. One letter in English contains less information than one character in Japanese. For instance, we see the letter "e" and have almost no idea what is happening in the sentence. However, we might see the Japanese Kanji "本" and intuit that the context is about books.

Compression algorithms might rely on some information about English to make the message consume fewer bits, producing a message like `hiwelcome2site`. 

English speakers are able to effectively decode the meaning of the sentence without punctuation and with some spelling variations. Even if a few letters are lost in transmission, we might have a good chance of still understanding the overall message. That is also because English has a low entropy per letter, meaning individual letters do not contain so much information.

An interesting use case of language compression is in *stenography*, where a few buttons can be used to effectively communicate the English language. Stenography is used in legal or parliamentary sessions, where there is a need to quickly encode what was verbally discussed into text. 

By studying Information Theory, we can prove the fundamental limits in what can be achieved in real-world encoding of text, images and even audio.

## The Project

For my term project in the module, I did a report on Gambling and Data Compression, from Cover and Thomas' chapter. The authors were using horse races for English text prediction.

In short, an information-theoretic perspective was used to frame the horse race gambling problem. The results from this analysis were then applied in the prediction of English language text. 

The predictor is basically a horse better, making bets on the next letter that will occur in a given sequence of letters. Hence, if the gambler can make good predictions and earn a lot of wealth, the predictor can also make good predictions for the english language.

The report is targeted at readers familiar with basic notations in Information Theory. If you'd like to learn more about the topic, I can direct you to some great resources. Interested readers can read the full analysis [here](/gambling.pdf).

