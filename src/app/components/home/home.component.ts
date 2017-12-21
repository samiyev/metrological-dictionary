import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ipcRenderer, app} from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  app = window.require('electron').remote;
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  onClose(){
    this.app.getCurrentWindow().close();
  }
}
