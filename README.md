# Unofficial Pug Obsidian Plugin

This plugin lets you render [Pug](https://pugjs.org/api/getting-started.html)
templates in your Obsidian vault.

## How it works

This plugin registers a
[Markdown post processor](https://docs.obsidian.md/Plugins/Editor/Markdown+post+processing)
for `pug` code blocks. The content of each source block is fed to Pug's
[`render()`](https://pugjs.org/api/reference.html#pugrendersource-options-callback)
function, and the current note's properties, also known as "front matter", are
included in Pug's rendering context as the variable `fm`.

## Usage

Here is an example page file:

````md
---
title: Test
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
````

Which produces the following:

> ## Simple Test
>
> This test demonstrates using the Pug templating language. Most of this content
> comes from the page's frontmatter.
>
> - one
> - two
> - three

### Including/Extending Partial Templates

From the [Pug documentation](https://pugjs.org/language/includes.html):

> Includes allow you to insert the contents of one Pug file into another.
>
> If the path is absolute (e.g., `include /root.pug`), it is resolved by
> prepending `options.basedir`. Otherwise, paths are resolved relative to the
> current file being compiled.
>
> If no file extension is given, `.pug` is automatically appended to the file
> name.

This plugin supports `include` (and
[`extends`](https://pugjs.org/language/inheritance.html)) with the "Includes
folder" setting, which is `pug-includes` by default. This setting's value is
provided as the `basedir` option for Pug. If you create the folder in your
vault's '.obsidian/' configuration folder, then you can store your partial
templates there.

For example, if you create the following file:

```pug
// .obsidian/pug-includes/test.pug
div
  span This text is from an include.
```

Then you can reference it in a note or another partial like so:

````md
```pug
include /test.pug
```
````

### Dataview Integration

This plugin integrates with the
[Dataview](https://github.com/blacksmithgu/obsidian-dataview) plugin. If you
have installed and enabled Dataview, then it's API will be exposed to the Pug
rendering context under the `dv` variable.

However, not all methods from the Dataview JavaScript API that you might use in
a `dataviewjs` code block are supported. Dataview's rendering methods, such as
`dv.header()` or `dv.table()`, do not work.

A fair bit of discovery and testing remains to be done.

## Installation

At the time of writing, this plugin has not yet been submitted as a community
plugin. Therefore, you must manually install this plugin, as you might do so for
the [`hot-reload` plugin](https://github.com/pjeby/hot-reload).

In the Releases section for this repository, you can find the zip archive that
contains all of the individual files. Unzip that archive so that its contents
are in a new directory called `unofficial-pug-plugin/`. Then you should be good
to go after restarting Obsidian and enabling the plugin.

## Developer Notes

This is a fork of Obsidian's sample plugin repository. Changes other than
implementing this plugin include:

- Various modifications to the release GitHub workflow.
- Adding a custom `esbuild` plugin to copy this plugin's files into a test
  vault.

### Test Vault

This repository contains an example Obsidian vault to showcase and test the
plugin's functionality. You will need to enable this plugin after initially
opening the folder in Obsidian.

### `hot-reload`

This repository also declares pjeby's
[`hot-reload`](https://github.com/pjeby/hot-reload) plugin as a submodule within
the test vault's `.obsidian/plugins/` directory. In order to actually download
`hot-reload`, you must run the following commands after cloning this repository:

```bash
git submodule init
git submodule update
```

After that, you should be able to run `npm run dev` and then open the vault.
