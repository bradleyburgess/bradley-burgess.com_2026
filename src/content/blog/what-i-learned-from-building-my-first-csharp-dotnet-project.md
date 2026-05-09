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

I'm thrilled to announce the first public release of *tsk* — a cross-platform,
single-binary command-line todo manager written in C#/.NET. This project began as a
way for me to explore C# and .NET, but it quickly evolved into a hands-on
masterclass in software architecture, modern development workflows, and
real-world release engineering.

This post is a behind-the-scenes look at what I learned building *tsk* from
scratch: the language, the patterns, the tooling, and the workflows that brought
it all together.

---

## 📘 Learning C# from the Ground Up

Before *tsk*, I had never written a single line of code in C#. Coming from a
primarily Python and Type-/JavaScript background, I found C# to be both powerful and
expressive. Here are some takeaways:

- **Strong typing:** I love the strong and strict typing. TypeScript is… nice…
  but it's plain as day to me now that it's not really a strongly-typed language
  — not in the same way that C#, Jave, or Go are. TypeScript feels a lot more like
  “syntactical sugar” after having used a language like C#.
- **String interpolation and pattern matching:** These made CLI output code
  cleaner than I'd expected. I love the `$""` interpolation and `@""` verbatim
  syntax.
- **Good architecture:** C# nudges you to build things better than you can get
  away with using loosey-goosey languages. Can you write bad C# code? Of course.
  But I do feel like it's harder. And, conversely, it's easier to write better
  code with a first-party DI container, and all the other C#/.NET goodies.
- **Great tooling:** As someone whose primary OS is a Linux distro, I was
  nervous about C#/.NET's connection to the Microsoft ecosystem — mostly because
  I thought I'd be fighting an uphill battle developing in C# on Linux. But I
  quickly found that this is absolutely not the case in 2025. The `dotnet` SDK
  CLI is really powerful, and while VS Code doesn't have all the Visual Studio
  bells and whistles, with the C# Dev Kit extension, you can be extremely
  productive.

---

## 🧱 Object-Oriented Programming in Practice

One of my goals was to really get to grips with OOP. Instead of just reading
about inheritance and encapsulation, I applied them:

- I created a `TodoItem` entity and surrounded it with **real-world
  responsibilities**: parsing, validation, mutation.
- I used **interfaces** to define behaviors and abstract away implementation
  details.
- I kept entity methods **focused and pure** wherever possible.
- I used **dependency injection** and **factory methods** to make code more loosely
  coupled and easily testable

This reinforced not just the *what* of OOP, but the *why* — how it leads to
testability, flexibility, and clarity when used well.

---

## 🧱 Clean Architecture: Layering the Right Way

I structured the app using a layered architecture:

- **`Tsk.Domain/`**: Core business logic, entities, and validation  
- **`Tsk.Infrastructure/`**: File I/O, serialization  
- **`Tsk.CLI/`**: Presentation layer using `Spectre.Console.Cli` (boy is that a
  great library!)

Even though it's a small app, this separation of concerns made the codebase feel
maintainable and scalable from day one. It also helped me understand:

- How layers talk to each other (via interfaces and dependency injection)
- How to write code that is decoupled from its environment

This was my first real attempt at "clean architecture," and it felt fantastic.
It definitely was slow going at first, but once I hit the `CLI` layer, it
really started to fly, as I could build confidently knowing that all tests were
passing and everything was well-architected.

---

## 💉 Dependency Injection

I tried manual DI in a previous Node project. I saw how powerful it was, but
manually injecting dependencies becomes really clunky really fast. But this
project really helped me see just why DI is so powerful. As soon as I need to:

- inject a mock repository in tests  
- swap between file-based and future database backends  
- pass shared config or services into CLI commands

… I realized why it's such a core part of modern development.

I wired up a lightweight DI system using
`Microsoft.Extensions.DependencyInjection` and `Spectre.Console.Cli`'s custom
type resolver, and organized services cleanly across the layers.

---

## 🔁 Git + GitHub Workflow: Working Like a Pro

This was my first project with a structured, intentional Git and GitHub
workflow:

- **Feature branches:** Every feature or fix got its own branch.
- **PRs and reviews:** Even solo, I used PRs to document and stage changes.
- **Issue tracking:** I tracked work using issues with clear references in
  commit messages.
- **Semantic commits:** I followed clear and conventional commit messages.
- **GitHub Actions:** Every PR and merge to main triggered an Action to run
  automated tests.

---

## 🚀 Automated GitHub Releases

One of the most satisfying parts was shipping *tsk* as:

- A single-file, self-contained binary
- Built and uploaded via **GitHub Actions**
- Prebuilt for **Linux, macOS, and Windows** (x64 + ARM64)

I learned:

- How to use `dotnet publish` to produce standalone binaries
- How to target multiple runtimes in a matrix build
- How to zip/tar artifacts depending on OS
- How to write a clean `release.yml` workflow that tags, builds, and publishes
  automatically

This transformed *tsk* from “just a project” to a real, distributable tool.

---

## 🧪 Testing and Mocking

I wrote real tests, not just toy ones. I learned how to:

- Use `xUnit` and `Moq` to test the core logic
- Separate unit tests from file integration tests

It also made me think more carefully about interfaces and design for
testability.

---

## 📝 Documentation That Matters

I put real effort into:

- Writing a professional, readable `README.md` with TOC, usage, and install
  instructions
- Including aliases, metadata flags, and even the plaintext DSL
- Creating a proper `CHANGELOG.md` using *Keep a Changelog* format
- Writing a GitHub release with full notes, features, and highlights

This was a great exercise in writing for other developers — or future me.

---

## 🛣 What's Next?

This is only the beginning. For future versions, I'd like to add:

- Filtering and sorting (in-memory and on-disk)
- Config file support
- Export options (JSON, CSV)
- Possibly a GUI wrapper or TUI mode
- Other niceties, like overdue tasks highlighting

And I want to keep refining my design patterns and release automation.

---

## Final Thoughts

Building *tsk* taught me more than I expected: not just about C# or CLIs, but
about shipping software the right way. I went from a blank directory to a
tested, documented, versioned, cross-platform release in just a couple weeks.

I was a little tentative about C# at first, mostly because I thought it was very
closely tied to the whole Microsoft ecosystem. But with the move to **.NET
Core** (now just ".NET"), it's truly cross-platform. Developing on Linux in VS
Code was very smooth with the **C# Dev Kit** extension and the `dotnet` SDK.

I will definitely be back for more.

---

Check out the project:
[https://github.com/bradleyburgess/tsk](https://github.com/bradleyburgess/tsk)
