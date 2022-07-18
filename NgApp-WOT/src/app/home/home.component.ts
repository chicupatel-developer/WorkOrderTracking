import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  time = {hour: 13, minute: 30};
  meridian = true;
  
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  constructor() { }

  ngOnInit(): void {
   
  }

}
