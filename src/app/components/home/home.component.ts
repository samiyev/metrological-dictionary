import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('input') input;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.input.nativeElement.focus();
  }

}
