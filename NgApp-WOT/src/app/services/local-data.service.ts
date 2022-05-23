import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  // role
  private MyRole;

  private UserName;


  constructor() { }

  // role
  setMyRole(val) {
    this.MyRole = val;
  }
  getMyRole() {
    return this.MyRole;
  }

  // login
  setUserName(val) {
    this.UserName = val;
  }
  getUserName() {
    return this.UserName;
  }
}
