---
title: Pose Estimator
date: "2019-06-26"
showTags: true
slug: "hackathon-cnn"
tags: 
- "artificial intelligence"
summary: "Hackathon edition. Training an image classifier to estimate people's poses. Is he supine or doing jumping jacks?"
---

# DSTA AI Camp

Together with some friends, I participated in the 2019 DSTA-TIL-AI camp over the summer. This AI camp was held in conjunction with the more well-known Cyber Defenders Discovery Camp (CDDC), a Capture-the-Flag (CTF) competition for computer security enthusiasts. The challenge was to train an image classifier to identify poses people were doing, also known as **pose estimation**.

## Image Classification

In the world of machine learning, image classification is currently done using [Convolutional Neural Networks (CNNs)](https://medium.com/@ksusorokina/image-classification-with-convolutional-neural-networks-496815db12a8). These neural networks are able to extract features like lines, and gradually build lines into shapes (e.g. circles), and eventually recognisable features (e.g. faces). 

![CNN](/media/pose-cnn-layers.png)

This [article](https://towardsdatascience.com/intuitively-understanding-convolutions-for-deep-learning-1f6f42faee1) gives a great explanation of convolutions.

### Existing Pose Estimators

We thought of using existing pose estimator neural networks that could extract features, such as [OpenPose](https://github.com/cmu-perceptual-computing-lab/openpose). Our idea was to use OpenPose to extract the coordinates of the joints, and then use these coordinates to train our model instead.

However, there were many limitations in applying this to our hackathon. For one, some of our poses were hand signals (e.g. spiderman fingers and gun poses). Given the joint-recognition technology, there was no clear way to distinguish these two poses. Furthermore, these models were not sufficiently well-trained. Then, we would be diminishing the data from the training images into (possibly inaccurate) coordinates.

### Transfer Learning

We re-trained an existing neural network using transfer learning. The idea is to let an image recognition model fit better to the set of images we were working with. This is much more cost- and time- effective than starting from scratch.

![Transfer Learning](/media/pose-trf-learning.png)

Imagine a neural network with multiple layers. Transfer learning unfreezes the last few layers of the neural network, and re-trains them. The first few layers remain frozen as these are extracting basic features (e.g. edge detection). 

`keras` has many models available for transfer learning, such as Xception and Inception.

### Data Augmentation

Lastly, images can vary even if they are depicting the same object. Data augmentation is vital in image classification. The basic data augmentation that keras can perform includes rotating, translating and resizing images.

![Example of data augmentation](/media/data-augmentation-example.png)

The top-performing team did impressive work in data augmentation:
- They cropped the humans out, and applied different background colours. This technique draws more focus on the shape of the human, effectively dulling background noise.
- They took more photos of themselves in the poses, at different angles. Adding more data was a whole lot of fun for them, and also greatly improved their repertoire of training data.

### Google Colaboratory

While we were given AWS credits for this hackathon, we found it more useful to use Google Colab. The training speed was about the same, but [Google Colab](https://colab.research.google.com/) offered more convenience since we could just import and run Jupyter notebooks.

## Remarks

Feel free to browse our final [presentation deck](/docs/toothtable-ppt.pdf).

Pose estimation has many real-world uses. I would love to see a sign-language interpreter, which would help bridge the gap between the signing and speaking worlds.
