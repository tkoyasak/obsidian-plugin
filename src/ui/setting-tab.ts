import { PluginSettingTab, Setting } from 'obsidian'
import type ObsidianPlugin from '../main.ts'
import type { Settings } from '../settings.ts'

export class SettingTab extends PluginSettingTab {
  constructor(
    private readonly plugin: ObsidianPlugin,
    private readonly settings: Settings,
  ) {
    super(plugin.app, plugin)
  }

  display(): void {
    const el = this.containerEl
    el.empty()
    el.createEl('h2', { text: 'Settings' })

    new Setting(el)
      .setName('Disable file name editing')
      .setDesc(
        'Disable file name *editing* via inline title or tab title bar (but still show the filename). ',
      )
  }
}
