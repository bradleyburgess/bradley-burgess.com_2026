---
title: 'Blind75 #2 — Valid Anagram'
description: >-
    Three different approaches to checking if two strings are anagrams: two 
    hash-based and one sorted.
publishDate: '2025-05-02'
isFeatured: false
image:
  src: '@/assets/img/blog/scrabble.jpg'
  alt: ''
category: dev
tags:
  - neetcode
  - dsa
  - python
---

Today I'm tackling the next NeetCode Blind75 problem: Valid Anagram.

## Problem

*Given two strings `s` and `t`, the task is to return `true` if they are
anagrams of each other, and `false` otherwise.*

Pretty simple in theory: both strings should contain the same letters in the
same frequency, just potentially in a different order.

## Solutions

I wrote three implementations and tested them all against the same inputs to
make sure the logic was sound. Here's what I came up with:

### 1. Naive Hash

My first approach is hash map-based, if a little naive / simplistic. This
solution builds two separate hash tables and compares them. It’s conceptually
simple, but requires space for two dictionaries.

```python
def is_anagram_hash(s1: str, s2: str) -> bool:
    hash1 = dict()
    hash2 = dict()
    for letter in s1:
        increment_letter(hash1, letter)
    for letter in s2:
        increment_letter(hash2, letter)
    return hash1 == hash2
```

### 2. Optimized Hash

Instead of creating two dictionaries, this approach uses a single hash and
updates counts in-place. The first loop over the first string increments counts;
the second decrements. If any value isn’t zero by the end, the strings aren’t
anagrams. I like this approach; it's pragmatic but more efficient than the first
solution.

```python
def is_anagram_hash_optimized(s1: str, s2: str) -> bool:
    hash = dict()
    for letter in s1:
        update_letter(hash, letter, UpdateMode.INCREMENT)
    for letter in s2:
        update_letter(hash, letter, UpdateMode.DECREMENT)
    for letter in hash:
        if hash[letter] != 0:
            return False
    return True
```

### 3. Sorted

My third solution just sorts both strings and compares them. It’s dead simple
and surprisingly effective — and usually fast enough. In a real-world scenario,
this will often be a great choice, assuming a manageable amount of data.

```python
def is_anagram_sorted(s1: str, s2: str) -> bool:
    return sorted(s1) == sorted(s2)
```

## Takeaways

The optimized hash version is probably the best in terms of time and space,
trade-off — assuming the character set is constrained (as it is here to
lowercase letters). But the sorted approach is hard to beat for readability and
real-world pragmatism.
