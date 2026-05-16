---
title: "How to Make Pytest Behave with Non-unique Filenames"
description: "Sometimes you want to have a standardized file-naming system, and Pytest doesn't like that."
publishDate: "2025-05-13"
isFeatured: true
category: dev
tags:
  - testing
  - python
image:
  src: '@/assets/img/blog/python-testing.png'
  alt: ""
---

I've been working on the NeetCode Blind75 problems, and I decided from the
beginning that I wanted to solve the problems locally instead of in the browser
editor. I'll submit the problem on NeetCode, but I want to have my own tests on
my own local machine. (You can view my work at the [GitHub
repo](https://github.com/bradleyburgess/neetcode-blind75/)).

I am currently doing the problems in Python and I'm using `pytest` for testing.
I started out with a great directory structure with each problem having its own
directory. I originally had it set up so that each problem used its own unique
filename and test filename, e.g.:

```text
neetcode-blind75/
|-- src/
    |-- 01_arrays_hashing/             # problem category
        |-- 01_contains_duplicate/     # individual problem
            |-- contains_duplicate.py
            |-- contains_duplicate_test.py
            |-- README.md
```

## Trying to keep things DRY

This was fine, and `pytest` liked this structure, because of the default import
mode (more on that below), but it was a bit laborious: I had to make changes to
the test file every time I made a new problem. It used to be:

```python
# 01_arrays_hashing/01_contains_duplicate/contains_duplicate_test.py

from contains_duplicate import contains_duplicate_brute

# ...
```

But I didn't want to have to change that import line every time. What I really
wanted was to keep it standardized:

```python

from .solution import Solution
```

I have multiple solutions to each problem, so I first put all the solutions
within a `Solution` class:

```python
# contains_duplicate.py

class Solution:
    def contains_duplicate_brute(nums: List[int]) -> bool:
        # ...
    
    def contains_duplicate_hashmap(nums: List[int]) -> bool:
        # ...
```

Great. This cuts down on my work to initialize a new problem, but it also has
the added benefit of mirroring how things work on Leet/NeetCode.

Then I made sure that every problem had consistent filenaming. I also knew that
I would need to make the folders a module/package to use relative imports (`from
.solution` vs `from solution`), so I added a `__init__.py` to each problem:

```text
neetcode-blind75/
|-- src/
    |-- 01_arrays_hashing/
        |-- 01_contains_duplicate/
            |-- __init__.py
            |-- solution.py
            |-- test.py
            |-- README.md
```

I updated `pyproject.toml` to account for the new test naming, and then…

```text
(.venv) ➜  neetcode-blind75 git:(main) ✗ pytest

=========================================================================== ERRORS ===========================================================================
__________________________________ ERROR collecting neetcode_blind75_python/01_arrays_hashing/01_contains_duplicate/test.py __________________________________
ImportError while importing test module '/home/bradley/Projects/neetcode-blind75/neetcode_blind75_python/01_arrays_hashing/01_contains_duplicate/test.py'.
Hint: make sure your test modules/packages have valid Python names.
Traceback:
/usr/lib/python3.11/importlib/__init__.py:126: in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
neetcode_blind75_python/01_arrays_hashing/01_contains_duplicate/test.py:2: in <module>
    from .solution import Solution
E   ImportError: attempted relative import with no known parent package
================================================================== short test summary info ===================================================================
ERROR neetcode_blind75_python/01_arrays_hashing/01_contains_duplicate/test.py
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
1 error in 0.12s
```

Yikes.

## It's quite a simple fix actually

LLMs were not very helpful in diagnosing this problem. They told me to change
`PYTHONPATH` and to run the tests with `python3 -m pytest src`. None of that
worked.

It was only when I Googled the actual error I was getting (`ImportError:
attempted relative import with no known parent package`) and read the Pytest
documentation that I discovered the **import mechanisms** of Pytest.

By default, Pytest uses the `prepend` import mode, which modifies `sys.path` to
allow importing test modules directly as **scripts**. What you really want is to
configure it to use the `importlib` import mechanism, which then utilizes the
actual, normal Python import system.

So all you have to do is run Pytest with the flag `--import-mode=importlib`, and
away you go. You can also just add the options in your `pyproject.toml`:

```toml
[tool.pytest.ini_options]
addopts = "-ra -q --import-mode=importlib"  # <- here
minversion = "7.0"
pythonpath = ["."]
testpaths = ["src"]
python_files = ["test.py"]
```

## Checklist

So, here's all you need to have non-unique package names and test filenames in
Pytest:

- [x] `__init__.py` in every test folder
- [x] relative imports (e.g. `from .solution` not `from solution`)
- [x] `--import-mode=importlib` in your `pyproject.toml` or on the `pytest`
  command

Done. (And the tests pass!)
