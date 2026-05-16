---
title: 'NeetCode Blind75: Intro and #1'
description: >-
    Getting started on my Blind75 journey with a look at the first problem — and 
    three different ways to solve it.
publishDate: '2025-04-09'
isFeatured: true
category: dev
tags:
  - neetcode
  - dsa
  - python
image:
  src: '@/assets/img/blog/dual-monitor.jpg'
  alt: ""
---

I’ve decided that it's time to get serious about *Data Structures and
Algorithms*, which is why I've started to tackle the [NeetCode
Blind75](https://neetcode.io/practice). It’s a curated list of 75 essential
coding problems, widely regarded as one of the best ways to prepare for
real-world interviews or just level up your algorithmic thinking.

I will be doing the problems initially in Python, although I might go back and
do them again in another language and/or paradigm. Java might be fun, or C++ —
Java because it's considered by many to be the best language for learning
(taught in many CS programs), and C++ because you have to take care of so much
more, like memory mangement etc. (C is probably a little extreme for this.)

## Methodology

I don't want to do the problems on Neet- or Leetcode. I want the code on my own
machine with my own tests. There are a number of reasons for this, but primary
among them is that I want to own the code and have it in my own repo. I also
hate writing code in the browser; it's nice to use your own tools. If I later
decide to do more serious interview prep, I can take off the “training wheels”
of and IDE.

The way I'm going to do this is to check out the Neetcode problem, and then
generate some tests with an LLM (one of the best uses of AI), which I'll expand.
Then, I can solve the problem in as many different ways as I want, and have all
the solutions co-exist in the repo.

---

## Intro to Problem #1: Contains Duplicates

The first problem is deceptively simple:

*Given an integer array `nums`, return `true` if any value appears **at least
twice** in the array, and return `false` if every element is distinct.*

Seems straightforward, but as is often the case, there are multiple ways to
solve it, each with different tradeoffs. I wanted to explore that explicitly, so
I wrote three different approaches: a brute-force solution, a hash map-based
solution, and a sort-based solution.

### Naive / Brute-force solution

```python
def brute_force(arr: list[int]) -> bool:
    result = False
    for i in range(len(arr)):
        if result == True:
            break
        for j in range(len(arr)):
            if j == i:
                continue
            if arr[i] == arr[j]:
                result = True
                break
    return result
```

This checks every pair, which is obviously not ideal solution. Because there are
two nested loops, it's **O(n²)** in time complexity — inefficient but good for
establishing baseline logic.

### Hash map solution

```python
def hashmap(arr: list[int]) -> bool:
    hash = dict()
    for item in arr:
        if item in hash:
            return True
        hash[item] = True
    return False
```

This is much more efficient: **O(n)** time and **O(n)** space. We're leveraging
a dictionary to track what we've seen. Here is our first tradeoff: We can
sacrifice some memory to save some (a lot of) time.

### Sort and compare solution

```python
def sort_pairs(arr: list[int]) -> bool:
    arr = sorted(arr)
    for i in range(1, len(arr)):
        if arr[i] == arr[i-1]:
            return True
    return False
```

Sorting takes **O(n log n)**, but once sorted, it’s fast and clean to compare
adjacent elements.

## Takeaways / Final Thoughts

I’m aiming to document each of the Blind75 problems as I go — not just the
solutions, but also my reasoning and takeaways. This is as much about
reinforcing my own understanding as it is about building a public record of
progress.

---

**EDIT (May 13, 2026):** I have come back to this project after a long hiatus.
In addition to what I stated above as my goals, I am realizing more and more, in
the growing age of AI, that we are at risk of
[cognitive decline](https://larsfaye.com/articles/agentic-coding-is-a-trap).
I am coming back to this as a way to stay sharp, fill in holes that I might have
had as a self-taught developer, and also find some fun again in programming.
