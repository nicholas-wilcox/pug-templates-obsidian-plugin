import { Plugin } from "obsidian";
import { render } from "pug";
import { getAPI, isPluginEnabled } from "obsidian-dataview";
import type { DataviewApi } from "obsidian-dataview";

export default class UnofficialPugPlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("pug", (source, el, ctx) => {
      let dv: DataviewApi | undefined;
      if (isPluginEnabled(this.app)) {
        dv = getAPI(this.app);

        if (dv === undefined) {
          console.error(
            "DataviewApi object was still undefined after attempting to load it.",
          );
        }
      }
      try {
        el.innerHTML = render(source, { fm: ctx.frontmatter, dv });
      } catch (e) {
        console.error(e);
        el.innerHTML = `<pre><code>${source}</code></pre><span>${e.toString()}</span>`;
      }
    });
  }

  onunload() {}
}
