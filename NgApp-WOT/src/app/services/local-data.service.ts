import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  // role
  private MyRole;

  private UserName;
  private FullName;

  private CurrentPart_ImageUpload: {
    partId: 0,
    partName: '',
    partImage:''
  };

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

  // check for 403
  // if any component's init() is requesting api without (token or valid token),
  // then auth-guard intercepts 403
  // if any component's init() (part-create,,,) is NOT requesting api,
  // so auth-guard has never get a chance to intercept 403 and component's html page gets display
  // so even to prevent to display component's html page and redirects to
  // home page,,, do,,,
  authGuard403_Intercept_To_PreventDisplayOfHtmlPage_Of_Component_Admin(reqPath) {    
    if (reqPath == '/part-create')
      return false;
    else if (reqPath == '/customer-order-create')
      return false;
    
    else
      return true;
  }
  authGuard403_Intercept_To_PreventDisplayOfHtmlPage_Of_Component_Operator(reqPath) {
    return true;
  }

  // display current part-image when part-upload is active
  setCurrentPart_ImageUpload(val) {
    this.CurrentPart_ImageUpload = val;
  }
  getCurrentPart_ImageUpload() {
    return this.CurrentPart_ImageUpload;
  }
}
