import { Plugin } from "obsidian";
import { render } from "pug";

export default class UnofficialPugPlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("pug", (source, el, ctx) => {
      el.innerHTML = render(source, { fm: ctx.frontmatter });
    });
  }

  onunload() {}
}
