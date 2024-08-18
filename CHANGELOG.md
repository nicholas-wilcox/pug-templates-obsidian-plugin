# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- #### Subheading order reference -->
<!-- -   `Added` -->
<!-- -   `Changed` -->
<!-- -   `Deprecated` -->
<!-- -   `Removed` -->
<!-- -   `Fixed` -->
<!-- -   `Security` -->

## [Unreleased]

### Added

- Add note about using the `FileSystemAdapter` in `README.md`.

### Changed

- Check for `instanceof` `FileSystemAdapter` instead of type casting.

## [0.3.2] - 2024-08-16

### Changed

- Refactor class names from `UnofficialPug` to `PugTemplate`.

## [0.3.1] - 2024-08-16

### Changed

- Updated package-lock.json.

## [0.3.0] - 2024-08-16

### Added

- Non-affiliation disclaimer in README.

### Changed

- Rename project name to `pug-templates-obsidian-plugin` and plugin id to
  `pug-templates`.
- Replace sample code in package.json.

## [0.2.0] - 2024-08-16

### Added

- Support for including partial templates.

### Changed

- Improved README

## [0.1.4] - 2024-08-14

### Added

- License file

## [0.1.3] - 2024-08-13

### Fixed

- Actually set the package and manifest version numbers.

## [0.1.2] - 2024-08-13

### Changed

- Wrap entire routine in try-catch block.

### Fixed

- Fix copy-paste typo in links at bottom of `CHANGELOG.md`

## [0.1.1] - 2024-08-03

### Fixed

- Copy-paste bug in release workflow.

## [0.1.0] - 2024-08-03

### Added

- Test vault and release workflow from unofficial-tailwindcss-obsidian-plugin.
- Dependency license information.
- Core functionality:
  - Register a Markdown code block processor for the Pug templating language.
  - Use document frontmatter in Pug rendering context.
  - Optional Dataview integration

### Removed

- Default settings code

[unreleased]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.3.2...HEAD
[0.3.2]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.3.1...0.3.2
[0.3.1]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.3.0...0.3.1
[0.3.0]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.2.0...0.3.0
[0.2.0]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.1.4...0.2.0
[0.1.4]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.1.3...0.1.4
[0.1.3]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.1.2...0.1.3
[0.1.2]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.1.1...0.1.2
[0.1.1]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/compare/0.1.0...0.1.1
[0.1.0]:
  https://github.com/nicholas-wilcox/pug-templates-obsidian-plugin/releases/tag/0.1.0
