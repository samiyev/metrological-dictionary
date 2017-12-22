import {Component, OnInit} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['/app.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-50%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateX(600px)', offset: 0.5}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(1000, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0.5, transform: 'translateX(-600px)', offset: 0.5}),
          style({opacity: 0, transform: 'translateX(50%)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  public show = false;

  constructor(private electronService: ElectronService) {
  }

  ngOnInit() {
    this.onLoad();
  }

  public async onLoad() {
    await (new Promise(done => setTimeout(done, 1)));
    this.electronService.onLoaded();
    this.show = true;
  }
}

// const DB = window.require('electron').remote.getGlobal('DB');
// const terms = await DB.words.find({}, {group: 1, term: 1});
// console.log(terms[0]);
//
// this.dictionary.push(...terms.sort((a, b) => {
//   a = a.group[this.defaultLanguage].charCodeAt(0);
//   b = b.group[this.defaultLanguage].charCodeAt(0);
//   return a - b;
// }));
