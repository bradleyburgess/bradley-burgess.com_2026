---
title: 256 Color Matcher
description: A simple web app to find the closest standard 256 color to a given input color
technologies:
  - html
  - css
  - js
publishDate: '2020-11-14'
isFeatured: true
links:
  github: 'https://github.com/bradleyburgess/256-color-matcher'
  demo: 'https://256-color-matcher.netlify.app'
image:
  src: '@/assets/img/projects/rainbow.jpg'
  alt: 256 Color Matcher
---

## Project overview

A tiny CLI tool for picking the closest 256-color/8-bit match to a given RGB or
hex color — perfect for theme designers, terminal tinkerers, and anyone working
with ANSI colors.

## Features

- Pure HTML, CSS and JS — no frameworks
- Hex and RGB modes (updates color texts and inputs)
- 18kb bundle size
- 3 npm dependencies
- Bundled with webpack
- Tests for all non-vendor library modules (`jest`)
- Last color saved to `localStorage` and retrieved on next visit

## Project story

I went through a *huge* terminal phase. I still love the terminal and do pretty
much everything I can do on the command line. I find it often much faster than
reaching for a GUI. I had a very elaborate ViM setup at one point, and took
styling pretty seriously. I wanted to be able to get standard 256 colors close
to certain palettes, but wanted a quick way to find these. Thus
`256-color-matcher` was born