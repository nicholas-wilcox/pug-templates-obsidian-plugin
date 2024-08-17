import { App, PluginSettingTab, Setting } from "obsidian";
import PugTemplatePlugin from "./main";

export interface PugTemplatePluginSettings {
  includesPath: string;
}

export const DEFAULT_SETTINGS: PugTemplatePluginSettings = {
  includesPath: "pug-includes",
};

export class SettingTab extends PluginSettingTab {
  plugin: PugTemplatePlugin;

  constructor(app: App, plugin: PugTemplatePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Includes folder")
      .setDesc(
        "A path (relative to your Vault's configuration folder) that contains Pug templates.",
      )
      .addText((text) =>
        text
          .setValue(this.plugin.settings.includesPath)
          .onChange(async (value) => {
            this.plugin.settings.includesPath = value;
          }),
      );
  }
}
