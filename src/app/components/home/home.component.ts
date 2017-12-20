import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input('dictionary') public dictionary;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
}
