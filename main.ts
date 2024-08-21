import {
  MarkdownPostProcessorContext,
  Plugin,
  normalizePath,
  FileSystemAdapter,
  DataAdapter,
} from "obsidian";
import { render } from "pug";
import { getAPI, isPluginEnabled } from "obsidian-dataview";
import type { DataviewApi } from "obsidian-dataview";
import { parseFragment } from "parse5";
import type {
  ChildNode,
  TextNode,
  Element,
  Template,
} from "parse5/dist/tree-adapters/default";
import {
  DEFAULT_SETTINGS,
  PugTemplatePluginSettings,
  SettingTab,
} from "./settings";

function renderNodes(childNodes: ChildNode[], parent: Node) {
  for (const node of childNodes) {
    switch (node.nodeName) {
      // Wrap text nodes in `<span>` tags.
      case "#text":
        createSpan({ text: (node as TextNode).value, parent });
        break;

      // Skipping these cases
      case "#comment":
      case "#documentType":
      case "template":
        break;

      // Everything else is treated like an HTML element.
      default:
        const child = node as Element | Template;
        const tagName = child.tagName as keyof HTMLElementTagNameMap;
        const attr = Object.fromEntries(
          child.attrs.map(({ name, value }) => [name, value]),
        );

        // We won't recurse when a child's children are only text nodes,
        // because we can stringify them and set the text content instead of recursing.
        if (child.childNodes.every((node) => node.nodeName === "#text")) {
          createEl(tagName, {
            text: child.childNodes
              .map((node) => (node as TextNode).value)
              .join("\n"),
            attr,
            parent,
          });
        } else {
          const element = createEl(tagName, {
            attr,
            parent,
          });
          renderNodes(child.childNodes, element);
        }
        break;
    }
  }
}

function renderError(parent: Node, error: string) {
  parent.empty();
  const pre = createEl("pre", {
    parent,
  });
  createEl("code", {
    text: error,
    parent: pre,
  });
}

export default class PugTemplatePlugin extends Plugin {
  settings: PugTemplatePluginSettings;

  async onload() {
    await this.loadSettings();
    this.registerMarkdownCodeBlockProcessor("pug", this.processPug.bind(this));
    this.addSettingTab(new SettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  get adapter(): DataAdapter {
    return this.app.vault.adapter;
  }

  async processPug(
    source: string,
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext,
  ) {
    try {
      if (!(this.adapter instanceof FileSystemAdapter)) {
        throw Error("Adapter is not FileSystemAdapter. Cannot proceed.");
      }
      const fm = ctx.frontmatter;
      const basedir = this.adapter.getFullPath(
        normalizePath(
          this.app.vault.configDir + "/" + this.settings.includesPath,
        ),
      );
      const filename = this.adapter.getFullPath(normalizePath(ctx.sourcePath));

      let dv: DataviewApi | undefined;
      if (isPluginEnabled(this.app)) {
        dv = getAPI(this.app);
        if (dv === undefined) {
          throw Error(
            "DataviewApi object was still undefined after attempting to load it.",
          );
        }
      }

      const pugHtml = render(source, { fm, basedir, filename, dv });
      const documentFragment = parseFragment(null, pugHtml, {});
      renderNodes(documentFragment.childNodes, el);
    } catch (e) {
      console.error(e);
      renderError(el, e.toString());
    }
  }
}
