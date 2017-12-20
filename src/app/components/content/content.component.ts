import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from "../../providers/electron.service";
import {TranslateService} from "@ngx-translate/core";

const DB = window.require('electron').remote.getGlobal('DB');


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public dictionary;
  public languages = [
    {value: 'ru', title: 'RUS', state: false},
    {value: 'uz', title: 'UZB', state: true}
  ];

  private defaultWordLanguage: string = 'uz';
  private defaultLanguage: string;
  public selectedWord = null;
  private sub: any;

  constructor(private electronService: ElectronService,
              private translate: TranslateService) {
    this.defaultLanguage = this.translate.getDefaultLang();
  }

  ngOnInit() {
    this.dictionary = this.electronService.dictionary;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLangulageChanged(language) {
    this.languages.forEach(lang => lang.state = lang.value === language.value);
    this.defaultWordLanguage = language.value;
  }


  onChangeLangauage() {

  }

  onWordSelected(word) {
    console.log(word);
    this.selectedWord = word;
  }
}
