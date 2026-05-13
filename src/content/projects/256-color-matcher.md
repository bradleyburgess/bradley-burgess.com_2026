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

This is a tiny web app for picking the closest standard 8-bit (256) color from a
RGB or hex color input. Target audience includes terminal tinkerers (I build the
app for this use for myself) and anyone working with ANSI colors.

## Features

- Pure HTML, CSS and JS — no frameworks
- Hex and RGB modes (updates color texts and inputs)
- `18 kb` bundle size
- 3 npm dependencies
- Bundled with webpack
- Tests for all non-vendor library modules (`jest` for test running)
- Last color saved to `localStorage` and retrieved on next visit

## Project story

I went through a *huge* terminal phase. I still love the terminal and do pretty
much everything I can do on the command line. I find it often much faster than
reaching for a GUI. I had a very elaborate ViM setup at one point, and took
styling pretty seriously. I wanted to be able to get standard 256 colors close
to certain palettes, but wanted a quick way to find these. `256-color-matcher`
was created as a tool to make this process easier.