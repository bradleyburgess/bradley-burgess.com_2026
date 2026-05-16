---
title: 'What I Learned From Building My First C#/.NET Project'
description: "Lessons in clean architecture, SOLID design, and great Git workflow"
excerpt: >
  Lessons in clean architecture, SOLID design, and doing Git "right".
publishDate: "2025-05-05"
isFeatured: true
category: dev
tags:
  - csharp
  - dotnet
  - git
  - oop
image:
  src: '@/assets/img/blog/tsk-logo.png'
  alt: 'Tsk'
---

I've just made the first public release of *tsk* — a cross-platform,
single-binary command-line todo manager written in C#/.NET. I started this
project as a way for to explore C# and .NET in preparation for an interview, but
in the process I learned a fair bit about clean architecture, SOLID design
principles, and more.

This post is a recap of what I learned building *tsk* from scratch, including
the C# language, the .NET framework, the patterns, the tooling, and the
workflows.

## Initial Learning of C #

Before *tsk*, I had never written a single line of code in C#. Coming from a
primarily Python and Type- and JavaScript background, I found C# to be both
powerful and expressive. Here are some takeaways:

- **Strong typing:** I love the strong and strict typing. TypeScript is… nice…
  but it's plain as day to me now that it's not really a strongly-typed language
  — not in the same way that C# or Java are. TypeScript feels a lot more like
  “syntactical sugar” after having used a language like C#.
- **String interpolation and pattern matching:** These made CLI output code
  cleaner than I'd expected. I love the `$""` interpolation and `@""` verbatim
  syntax.
- **Good architecture:** C# nudges you to build things better than you can get
  away with using loosey-goosey languages. Can you write bad C# code? Of course.
  But I do feel like it's probably harder. And, conversely, it's easier to write better
  code with a first-party DI container, and all the other C#/.NET goodies.
- **Great tooling:** As someone whose primary OS is a Linux distro, I was
  skeptical about C#/.NET's connection to the Microsoft ecosystem — mostly because
  I thought I'd be fighting an uphill battle developing in C# on Linux. But I
  quickly found that this is absolutely not the case in 2025. The `dotnet` SDK
  CLI is really powerful, and while VS Code doesn't have all the Visual Studio
  bells and whistles, with the
  [C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit),
  you can be extremely productive.

## Object-Oriented Programming in Practice

One of my goals with this project was to get better at OOP. Thus:

- I created a `TodoItem` entity and surrounded it with real-world
  responsibilities: parsing, validation, mutation.
- I used interfaces to define behaviors and abstract away implementation
  details, to be handled by concrete implementations
- I kept entity methods focused and pure wherever possible.
- I used dependency injection and factory methods to make code more loosely
  coupled and easily testable

This reinforced not just the *what* of OOP, but the *why* — how it leads to
testability, flexibility, and clarity when used well.

## Clean Architecture

I structured the app using a layered architecture:

- **`Tsk.Domain/`**: Core business logic, entities, and validation  
- **`Tsk.Infrastructure/`**: File I/O, serialization  
- **`Tsk.CLI/`**: Presentation layer using `Spectre.Console.Cli` (boy is that a
  great library!)

Even though it's a small app, this separation of concerns made the codebase feel
more maintainable and scalable from day one. It also helped me understand how
layers talk to each other (via interfaces and dependency injection) and how to
write code that is decoupled from its environment.

This was my first real attempt at "clean architecture," and it definitely was an
adjustment. It's a lot more work upfront, and making changes requires touching
more points of the codebase. But I can see why it is so popular in especially
enterprise contexts; you end up with a codebaase that feels a bit more
maintainable and scalable, especially with larger teams.

## Dependency Injection

I had tried manual DI in a previous Node project. I saw how powerful it was in
creating decoupled and reusable code, but manually injecting dependencies
becomes really clunky really fast. `.NET` treats DI as a first-class citizen,
and the difference really is night and day[^1]. You can easily:

- inject a mock repository in tests  
- swap between file-based and future database backends  
- pass shared config or services into CLI commands

I wired up a lightweight DI system using
`Microsoft.Extensions.DependencyInjection` and `Spectre.Console.Cli`'s custom
type resolver, and organized services cleanly across the layers.

---

## Git + GitHub Workflow

This was my first project with a structured, intentional Git and GitHub
workflow:

- **Feature branches:** Every feature or fix got its own branch.
- **PRs and reviews:** I used PRs to document and stage changes.
- **Issue tracking:** I tracked work using issues with clear references in
  commit messages.
- **Semantic commits:** I followed clear and conventional commit messages.
- **GitHub Actions:** Every PR and merge to main triggered an Action to run
  automated tests.

This approach helped me level up my Git fu, and these lessons are so
transferrable to other projects, different teams, etc. It is of course a little
much to use this workflow as a solo dev, but even then there are definite
benefits.

## Automated GitHub Releases

A really satisfying part of this project's setup was shipping *tsk* in an
automated way:

- A single-file, self-contained binary
- Built and uploaded via **GitHub Actions**
- Prebuilt for **Linux, macOS, and Windows** (x64 + ARM64)

It took a bit of trial and error to get it working (it always does with GitHub
Actions), but it's really neat having Git tags translate into releases
automatically.

## Testing and Mocking

I tried to get pretty good test coverage. A little TDD here and there, but I'm
never strict about that. I used `xUnit` and `Moq` to test the core logic, with
separate unit and integration tests. I found that clean architecture gives you
really good testing ergonomics — when you have interfaces, you can so easily
mock implementations or swap in something else for testing.

## What's Next?

I probably won't expand this project much, but future ideas include:

- Filtering and sorting (in-memory and on-disk)
- Config file support
- Export options (JSON, CSV)
- Possibly a GUI wrapper or TUI mode
- Other niceties, like overdue tasks highlighting
- Different backend and client implementations, e.g.  database-backed storage
  or an API

---

If you're curious, [check out the project on GitHub](https://github.com/bradleyburgess/tsk).

[^1]: I know there are actual DI containers in the Typescript ecosystem, and Nest.js
      is a thing, but I'm talking here about first-party, integrated support for
      dependency injection / inversion.
