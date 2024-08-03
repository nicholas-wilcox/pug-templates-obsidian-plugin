---
title: Dataview Test
summary: |
  This test demonstrates using the Dataview plugin API in Pug templates.
---

```pug
h2= fm.title
p
  | #{fm.summary}
  | It will only work when the Dataview plugin is enabled, though you may
  | need to alter the contents of the code block to observe setting changes.
h3 Tests
ul
  each page in dv.pages()
    li #[strong #{page.title}:] #{page.summary}
```
