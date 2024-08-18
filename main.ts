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
import {
  DEFAULT_SETTINGS,
  PugTemplatePluginSettings,
  SettingTab,
} from "./settings";

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

      el.innerHTML = render(source, { fm, basedir, filename, dv });
    } catch (e) {
      console.error(e);
      el.innerHTML = `<pre><code>${source}</code></pre><span>${e.toString()}</span>`;
    }
  }
}
