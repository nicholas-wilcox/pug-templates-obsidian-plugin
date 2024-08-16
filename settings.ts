import { App, PluginSettingTab, Setting } from "obsidian";
import UnofficialPugPlugin from "./main";

export interface UnofficialPugPluginSettings {
  includesPath: string;
}

export const DEFAULT_SETTINGS: UnofficialPugPluginSettings = {
  includesPath: "pug-includes",
};

export class SettingTab extends PluginSettingTab {
  plugin: UnofficialPugPlugin;

  constructor(app: App, plugin: UnofficialPugPlugin) {
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
