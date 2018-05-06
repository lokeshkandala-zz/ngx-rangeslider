import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  min=5;
  max=60;
  range=[1400,1600];
  min1=-10;
  max1=50;
  step=5;
  twoWayRange=[10,30];
  customStyleRange=[5,38];
  stepRange=[25,40];
  changed()
  {
    this.twoWayRange=[...this.twoWayRange];
  }
  rangeChanged(event:any)
  {
   // console.log(event);
  }
}
