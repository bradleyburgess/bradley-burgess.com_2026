---
title: 'img-figcaptions'
description: A simple utility to convert `<img>` tags with `alt` text into semantic `<figure>` and `<figcaption>` HTML
publishDate: '2022-06-17'
isFeatured: false
links:
  github: https://github.com/bradleyburgess/img-figcaptions
image:
  src: '@/assets/img/projects/art-gallery.jpg'
  alt: An art gallery with paintings on the wall
technologies:
  - 11ty
  - node
---

## Project overview

**img-figcaptions** is a tiny HTML utility that transforms standard `<img>` tags
into semantic HTML5 `<figure>` elements with `<figcaption>`, using the `alt`
attribute as the caption text. It’s especially useful for improving
accessibility and document structure in static sites or Markdown-generated
content.

This plugin makes it easy to pair images with accessible `<figcaption>` text
without cluttering your markup. It also makes it possible for non-technical
users (e.g. using a headless CMS) to add captions.

## Features

- Converts `<img>` tags with `alt` attributes into `<figure>` + `<figcaption>`
- Gracefully ignores `<img>` tags without `alt` text
- Supports `loading`, `width`, `height`, and other attributes
- Lightweight, no dependencies
- Works with raw HTML strings or file input

## Use case

In many Markdown or HTML authoring workflows, images are rendered as plain
`<img>` elements. This tool helps upgrade those images to semantic HTML5 markup,
improving accessibility and enabling better styling and structure — all while
preserving the original image attributes.

##  Example

**Input:**

```html
<img
  src="flowers.jpg"
  alt="A bunch of spring flowers"
  width="300"
  loading="lazy"
/>
```

**Output:**

```html
<figure>
  <img src="flowers.jpg" width="300" loading="lazy" />
  <figcaption>A bunch of spring flowers</figcaption>
</figure>
```

## Usage

Install from NPM:

```bash
npm install -g img-figcaptions
```

Convert a file:

```bash
img-figcaptions input.html > output.html
```

Or use it programmatically:

```js
import { transform } from 'img-figcaptions';

const result = transform('<img src="cat.jpg" alt="A sleepy cat" />');
console.log(result);
```

## Tests

The project includes a suite of unit tests to ensure robust parsing across edge
cases and attribute combinations.

```bash
npm test
```

## Repository

See the [GitHub repo](https://github.com/bradleyburgess/img-figcaptions) for
usage examples, contributing guidelines, and open issues.