import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, normalizePath } from 'obsidian';
import { render } from 'pug';

interface UnofficialPugSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: UnofficialPugSettings = {
	mySetting: 'default'
}

export default class UnofficialPugPlugin extends Plugin {
	settings: UnofficialPugSettings;

	async onload() {
		await this.loadSettings();
		this.registerMarkdownCodeBlockProcessor('pug', (source, el, ctx) => {
			el.innerHTML = render(source, { fm: ctx.frontmatter });
		});
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
