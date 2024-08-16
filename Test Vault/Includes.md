---
title: Includes Test
summary: |
  This test demonstrates including partial templates in your Pug codeblocks.
---

```pug
h2= fm.title
p= fm.summary

include /test.pug
```
