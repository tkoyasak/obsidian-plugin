import { Plugin } from 'obsidian'
import { NewNotes } from './features/new-notes'
import type { Settings } from './settings'
import { SettingTab } from './ui/setting-tab'

export default class ObsidianPlugin extends Plugin {
  settings!: Settings
  newNotes!: NewNotes

  public async onload(): Promise<void> {
    this.settings = await this.loadSettings()

    this.newNotes = new NewNotes(this.app, this)
    this.newNotes.registerCommands()

    this.addSettingTab(new SettingTab(this.app, this))
  }

  public async onunload(): Promise<void> {
    this.newNotes.unregisterCommands()
  }

  public async loadSettings(): Promise<Settings> {
    const defaultSettings = {
      uidType: 'ulid',
      newNoteFolder: this.app.fileManager.getNewFileParent('').path,
    } as const satisfies Settings

    return Object.assign(defaultSettings, await this.loadData())
  }

  public async saveSettings(): Promise<void> {
    await this.saveData(this.settings)
  }
}