import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataService } from '../services/local-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isUserAuthenticated: boolean;
  
    constructor(public localDataService: LocalDataService, public userService: UserService, private _router: Router) {
    this.userService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  ngOnInit(): void {   
    this.localDataService.setUserName(localStorage.getItem('userName')); 
    this.localDataService.setFullName(localStorage.getItem('fullName')); 
    this.localDataService.setMyRole(localStorage.getItem('myRole'));
  }

  logout() {
    this.userService.doLogout();   
  }

}
