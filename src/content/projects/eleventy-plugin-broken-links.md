---
title: 'Eleventy Plugin: Broken Links'
description: An Eleventy plugin to check your build for broken links
publishDate: '2022-04-21'
isFeatured: true
links:
  github: https://github.com/bradleyburgess/eleventy-plugin-broken-links
image:
  src: '@/assets/img/projects/broken-chain.jpg'
  alt: Project preview
technologies:
  - 11ty
  - node
---

## Project overview

This is an [11ty](https://11ty.dev) plugin to check for broken links during a
build. It has been tested with `@11ty/eleventy` versions `1.0.2` (final v. 1
release), `2.x.x` (the latest v. 2 release), and `3.0.0`.

There are options for customization, but the gist of it is that the plugin will
throw an error during build if there is a broken link, and warn if there are
redirects.

The plugin runs after the Eleventy build step and checks all output HTML for
broken internal and external links

## Project story

My current personal sites both use [Astro](https://astro.build), however I am
also a big fan of 11ty, and a previous iteration of my music site was built with
it.

I was linking to a fair few external sites in some places, and I searched for a
plugin that would detect broken links. (There is little on this earth more
_annoying_ than broken links, am I right?)

I couldn't find such a plugin, so I built one! It has been used in sites built by
other people, one of whom has actually contributed to the project.

You can read more about this project, including installation and usage, in the
project [README](https://github.com/bradleyburgess/eleventy-plugin-broken-links#eleventy-plugin-broken-links).
