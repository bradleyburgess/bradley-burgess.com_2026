---
title: tsk
description: A fast, cross-platform task manager for the terminal, built with C# and .NET
publishDate: '2025-05-05'
isFeatured: true
links:
  github: https://github.com/bradleyburgess/tsk
image:
  src: '@/assets/img/blog/tsk-logo.png'
  alt: Tsk
technologies:
  - dotnet
---

## Project overview

**tsk** is a fast, flexible, and cross-platform command-line todo manager
written in C#/.NET. It stores tasks in a plaintext file using a simple and expressive
DSL, and includes structured commands, metadata support (tags, locations, due
dates), and real CLI ergonomics with helpful aliases.

Binaries are distributed as self-contained single files for Linux, macOS, and
Windows (x64 and ARM64), with no installation or .NET runtime required.

You can view the project source, usage examples, and installation instructions
in the [GitHub repository](https://github.com/bradleyburgess/tsk).

## Project story

This project started as a way to get hands-on with C# and .NET, but it quickly
grew into a complete exercise in building, testing, and shipping a real
command-line tool.

I used *tsk* as a learning lab for:
- Object-oriented design and clean architecture
- Dependency injection and interface-driven development
- Writing CLI applications with `Spectre.Console.Cli`
- Automated cross-platform builds using GitHub Actions
- Packaging and publishing binaries with versioned releases

The final result is a small but robust tool that I'm proud to use daily — and
one that demonstrates a full end-to-end software development process.

I wrote a full blog post about the experience: [What I Learned From Building My
First C#/.NET
Project](/blog/what-i-learned-from-building-my-first-csharp-dotnet-project)

You can try it out yourself from the [Releases
page](https://github.com/bradleyburgess/tsk/releases).
