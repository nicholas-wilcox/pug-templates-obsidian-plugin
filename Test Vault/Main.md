---
title: Simple Test
summary: |
  This test demonstrates using the Pug templating language.
list:
  - one
  - two
  - three
---

```pug
h2= fm.title
p
  | #{fm.summary}
  | Most of this content comes from the page's frontmatter.
ul
  each val in ['one', 'two', 'three']
    li= val
```
