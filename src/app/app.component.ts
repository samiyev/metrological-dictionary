import {Component, OnInit} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {animate, group, state, style, transition, trigger} from "@angular/animations";

const DB = window.require('electron').remote.getGlobal('DB');

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="show" class="app-page">
      <router-outlet></router-outlet>
    </div>
    <div *ngIf="!show" class="loding-box">

    </div>
  `,
  styles: [
      `
      .app-page {
        height: calc(100vh - 40px);
        width: calc(100vw - 40px);
        overflow: hidden;
        background-color: #F8F8F8;
        border-radius: 8px;
        -webkit-box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 1);
        -moz-box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 1);
        box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 1);
        position: relative;
        padding: 5px;
      }

      .loding-box {
        height: 350px;
        width: 500px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
      }
    `
  ],
  animations: [
    trigger('flyInOut', [
      state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  dictionary = [];
  show = false;
  private defaultLanguage: string;

  constructor(public electronService: ElectronService,
              private translate: TranslateService) {
    translate.setDefaultLang('uz');
    this.defaultLanguage = this.translate.getDefaultLang();
  }


  ngOnInit() {
    this.getTerms();
  }

  async getTerms() {
    const terms = await DB.words.find({});
    this.dictionary.push(...terms.sort((a, b) => {
      a = a.group[this.defaultLanguage].charCodeAt(0);
      b = b.group[this.defaultLanguage].charCodeAt(0);
      return a - b;
    }));
    await (new Promise(done => setTimeout(done, 5000)));
    this.electronService.onDictionaryInited(this.dictionary);
    this.show = true;
  }
}
