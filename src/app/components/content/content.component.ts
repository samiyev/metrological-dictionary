import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from "../../providers/electron.service";
import {TranslateService} from "@ngx-translate/core";
import {dictionary} from "./dictionary";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private defaultLanguage: string;
  public showSearchInput = false;
  public selectedWord = null;
  public loading: boolean;
  public dictionary;
  private sub: any;
  private defaultLanguageChangingSub: any;

  constructor(private electronService: ElectronService,
              private translate: TranslateService) {
    this.defaultLanguage = this.translate.getDefaultLang();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public ngOnInit() {
    this.defaultLanguageChangingSub = this.electronService
      .defaultLanguageChanged.subscribe(this.defaultLanguageChanged.bind(this));
    this.onInitDictionary();
  }

  private defaultLanguageChanged(language) {
    this.defaultLanguage = language;
    this.onInitDictionary();
  }

  public onInitDictionary() {
    this.dictionary = dictionary.sort((a: any, b: any) => {
      a = a.group[this.defaultLanguage].charCodeAt(0);
      b = b.group[this.defaultLanguage].charCodeAt(0);
      return a - b;
    });
  }

  public async onWordSelected(word) {
    this.loading = true;

    if (this.selectedWord) {
      this.selectedWord.selected = false;
    }

    this.selectedWord = word;
    this.selectedWord.selected = true;
    await (new Promise(done => setTimeout(done, 1000)));
    this.loading = false;
  }

  public isPrintedGroup(word) {
    let prevReport = this.dictionary[this.dictionary.indexOf(word) - 1];
    return !prevReport || word.group[this.defaultLanguage] !== prevReport.group[this.defaultLanguage];
  }
}
