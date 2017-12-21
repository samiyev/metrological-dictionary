import {ipcRenderer, app} from 'electron';
import * as childProcess from 'child_process';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ElectronService {
  private ipcRenderer: typeof ipcRenderer;
  private childProcess: typeof childProcess;
  public onDictionaryInitedEvent = new EventEmitter();
  public isElectron = () => window && window.process && window.process.type;
  public dictionary: any;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }
  }

  public onDictionaryInited(dictionary) {
    this.dictionary = dictionary
  }
}
