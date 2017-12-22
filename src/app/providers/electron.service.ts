import {ipcRenderer, app} from 'electron';
import * as childProcess from 'child_process';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ElectronService {
  private ipcRenderer: typeof ipcRenderer;
  private childProcess: typeof childProcess;

  public loaded = new EventEmitter();
  public defaultLanguageChanged = new EventEmitter();

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }
  }

  public onLoaded() {
    this.loaded.emit();
  }

  public onDefaultlanguageChanged(language) {

    this.defaultLanguageChanged.emit(language);
  }

  private isElectron = () => window && window.process && window.process.type;
}
