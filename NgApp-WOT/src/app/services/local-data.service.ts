import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  // role
  private MyRole;

  private UserName;
  private FullName;

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
  setFullName(val) {
    this.FullName = val;
  }
  getFullName() {
    return this.FullName;
  }

  // 400
  display400andEx(error, componentName): string[] {
    var errors = [];
    if (error.status == 400) {
      
      console.log(error.error.errors[0]);
      
      if (error.error.errors != null) {      
        for (var key in error.error.errors) {
          errors.push(error.error.errors[key]);
        }
      } else {
        errors.push('[' + componentName + ']  Bad Request !');
      }
    }
    else {
      console.log(error);
    }
    return errors;
  }
}
