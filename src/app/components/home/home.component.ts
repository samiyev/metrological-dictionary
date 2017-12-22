import {ipcRenderer, app} from 'electron';
import {Component, EventEmitter, Input, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from "../../providers/electron.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public app = window.require('electron').remote;
  public defaultLanguage: string;
  public defaultLanguageChanged = new EventEmitter();

  public languages = [
    {value: 'uz', title: 'UZB', state: true},
    {value: 'ru', title: 'RUS', state: false},
    {value: 'en', title: 'ENG', state: false}
  ];

  constructor(private translateService: TranslateService,
              public electronService: ElectronService) {
    this.translateService.setDefaultLang('uz');
    this.defaultLanguage = this.translateService.getDefaultLang();
  }

  public onLangulageChanged(language) {
    if (language.value === 'en') return;
    this.defaultLanguage = language.value;
    this.translateService.setDefaultLang(language.value);
    this.electronService.onDefaultlanguageChanged(language.value);
    this.languages
      .forEach(lang => lang.state = lang.value === language.value);
  }

  public onClose() {
    this.app.getCurrentWindow().close();
  }
}
