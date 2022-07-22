import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  // role
  private MyRole;

  private UserName;
  private FullName;
  private MyUserId;

  // create new operation for workorder
  private WorkOrderId;

  private CurrentPart_ImageUpload: {
    partId: 0,
    partName: '',
    partImage:''
  };

  constructor() { }

  // create new operation for workorder
  setWorkOrderId(val) {
    this.WorkOrderId = val;
  }
  getWorkOrderId() {
    return this.WorkOrderId;
  }

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
  setMyUserId(val) {
    this.MyUserId = val;
  }
  getMyUserId() {
    return this.MyUserId;
  }

  // 400
  display400andEx(error, componentName): string[] {
    var errors = [];
    if (error.status === 400) {
      console.log(error.error);
      if (error.error != null) {
        for (var key in error.error) {
          errors.push(error.error[key]);
        }
      } else {
        errors.push('[' + componentName + '] Data Not Found ! / Bad Request !');
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
    // no api call @ init() to render page,,,
    if (reqPath == '/part-create')
      return false;
    else if (reqPath == '/customer-order-create')
      return false;
    else if (reqPath == '/work-order-create')
      return false;
    else if (reqPath == '/operation-create')
      return false;

    // api call @ init() to render page,,,
    // comment code @component in init()-->api call --> error handling code for 401
      /*
          if (error.status == 401)            
            this.apiResponse = 'Un-Authorized !';
          else
            this.apiResponse = 'Error !';
      */ 
    // following code will handle 401
    else if (reqPath == '/part')
      return false;
    else if (reqPath == '/part-edit')
      return false;
    else if (reqPath == '/part-remove')
      return false;
    else if (reqPath == '/part-upload')
      return false;
    else if (reqPath == '/customer-order')
      return false;
    else if (reqPath == '/customer-order-edit')
      return false;
    else if (reqPath == '/customer-order-remove')
      return false;
    else if (reqPath == '/customer-order-progress-text-report')
      return false;
    else if (reqPath == '/work-order')
      return false;
    else if (reqPath == '/work-order-edit')
      return false;
    else if (reqPath == '/work-order-remove')
      return false;
    else if (reqPath == '/operation')
      return false;
    else if (reqPath == '/operation-edit')
      return false;
    else if (reqPath == '/xfer-parts')
      return false;
    else if (reqPath == '/operation-log')
      return false;
    
    else
      return true;
  }
  authGuard403_Intercept_To_PreventDisplayOfHtmlPage_Of_Component_Operator(reqPath) {
    if (reqPath == '/view-op-log')
      return false;
    else if (reqPath == '/create-op-log')
      return false;
    
    else
      return true;
  }

  // display current part-image when part-upload is active
  setCurrentPart_ImageUpload(val) {
    this.CurrentPart_ImageUpload = val;
  }
  getCurrentPart_ImageUpload() {
    return this.CurrentPart_ImageUpload;
  }



  getRoles() {
    return [{ name: "Admin" }, { name: "Operator" }];
  }
  getWorkOrderStatusToDisplay() {
    return [
      { value: 0, woStatus: "Not_Started" },
      { value: 1, woStatus: "Start_Running" },
      { value: 2, woStatus: "Completed" },
      { value: 3, woStatus: "Can_Not_Complete" },
    ];
  }
  getOperationStatusToDisplay() {
    return [
      { value: 0, opStatus: "Not_Started" },
      { value: 1, opStatus: "Start_Running" },
      { value: 2, opStatus: "Pause_Running" },
      { value: 3, opStatus: "Completed" },
      { value: 4, opStatus: "Can_Not_Complete" },
    ];
  }
  getOperationStatusToDisplayForOperator() {
    return [
      { value: 0, opStatus: "Start_Running" },
      { value: 1, opStatus: "Pause_Running" },
    ];
  }
  getOperationNumberToDisplay() {
    return [
      { value: 10, opNumber: "Spindle" },
      { value: 20, opNumber: "Hub_Single_Head" },
      { value: 30, opNumber: "Hub_Double_Head" },
      { value: 40, opNumber: "Push_Cups" },
      { value: 50, opNumber: "Assembly_Spindle_Hub" },
      { value: 60, opNumber: "Paint" },
      { value: 70, opNumber: "Packaging" },
      { value: 80, opNumber: "Rework_Spindle" },
      { value: 90, opNumber: "Rework_Hub" },
    ];
  }
  getWorkOrderStatus(wos) {
    if (wos === 0) return "Not_Started";
    if (wos === 1) return "Start_Running";
    if (wos === 2) return "Completed";
    if (wos === 3) return "Can_Not_Complete";
    else return "";
  }
  getDaysLeft(startDate) {
    let date_1 = new Date(startDate);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays+1;
  }
  getOperationStatus(ops) {
    if (ops === 0) return "Not_Started";
    if (ops === 1) return "Start_Running";
    if (ops === 2) return "Pause_Running";
    if (ops === 3) return "Completed";
    if (ops === 4) return "Can_Not_Complete";
    else return "";
  }
  getOperationNumber(opn) {
    if (opn === 10) return opn + "- Spindle";
    if (opn === 20) return opn + "- Hub_Single_Head";
    if (opn === 30) return opn + "- Hub_Double_Head";
    if (opn === 40) return opn + "- Push_Cups";
    if (opn === 50) return opn + "- Assembly_Spindle_Hub";
    if (opn === 60) return opn + "- Paint";
    if (opn === 70) return opn + "- Packaging";
    if (opn === 80) return opn + "- Rework_Spindle";
    if (opn === 90) return opn + "- Rework_Hub";
    else return "";
  }
  getOperationStatusForOperator(ops) {
    if (ops === 0) return "Start_Running";
    if (ops === 1) return "Pause_Running";
    else return "";
  }

}
