---
title: Building a Simple Language Model
date: "2019-03-10"
showTags: true
math: true
slug: "ngram-language-model"
tags:
  - "natural-language-processing"
summary: "Tokenising sentences to distinguish sentences of different languages"
---

This project aims to build a language model to distinguish sentences in three languages: Bahasa Melayu, Bahasa Indonesia, and Tamil.

> Disclaimer: The input data is a romanised version of these languages. It is not my intention to pretend to know these languages.

## General Methodology
The **n-gram** model works by **tokenising** every corpus, and associating the tokens with a label (i.e. a language).

For example, suppose there are two sentences:
1. English: Be Nice
2. German: Guten Tag

The tokeniser will split the sentences into tokens of `n` characters. With `n=4`, the tokenised statements will be:
1. English: (Be N), (e Ni), ( Nic), (Nice)
2. German: (Gute), (uten), (ten ), (en T), (n Ta), ( Tag)

![ngram Tokenisation](/media/ngram-tokenisation.png)

As shown, the tokenisation takes into account the whitespace character ' ' to represent words. Other customisations to the model I made include:
- Including/ ignoring punctuation
- Case sensitive/ insensitive
- Length of token (currently 4)
- Padding*

*Padding adds whitespace before the first character \[e.g. (   B), (  Be), ( Be )\] and after the last character \[e.g. (ice ), (ce  ), (e   )\]. Including these tokens will better represent sentences. If we detect padding, we know that we are at the sentence boundaries.

![ngram Padding](/media/ngram-padding.png)

## Evaluation Criteria

The algorithm looks at a sample sentence, and decides which language it belongs to. Note that the algorithm's prediction could be that the sentence is not a match with any of the languages in the model.

![ngram Evaluation](/media/ngram-compare.png)

For example, given the tokenised sentence of "How Nice", the algorithm performs the following steps:

**1. Scoring every token**. Scores tokens based on how common they are in each language.

The score of token counts is normalised over the total number of tokens in the language. This way, having a high count for every token would not give a very high score. 

**2. Combining token scores**. All the token counts are multiplied together, to give each language a score. 

There could be a case where a particular token doesn't appear in a language, creating a 0 token score. To prevent the total score being suppressed to zero, Laplace smoothing is used and the count of all tokens is artificially increased by 1.

**3. Comparing scores**. The language with the highest score is the prediction result.

## Prediction for "invalid" languages

There could be the case where the sample sentence does not match with any of the languages in the model. I've come up with two ways to make this calculation:

* The score of the winning language must be **at least a threshold value**.
* The **difference in the score** of the winning language and the runner-up language must be at least a threshold value. This method requires that a language be definitively the prediction result.

A combination of both criteria can be used. In both cases, an arbitrary threshold value is used, though it can be tuned with more labelled datasets.

## Computation optimisations

The training corpus tends to be large, so the total number of tokens in a language could be in the order of 100,000. Now suppose that in our test sentence, the token only appears in the order of 10 times. Then, we would end up with a small number for the token score, like: $$\frac{10}{100,000}$$

Recall earlier that multiplication is used to combine multiple token scores, meaning the final language score will be **infinitesimally small** and hard to compare. A **logarithm operation** is performed on every intermediate score to prevent floating point errors skewing the results.

## Remarks

There are nifty library functions (such as tokenisation) provided in the natural language toolkit (nltk) Python module.

For more details, do check out the project on [GitHub](https://github.com/pikulet/language-model).

The original assignment question can be found [here](https://www.comp.nus.edu.sg/~zhaojin/cs3245_2019/hw1-lang.html).