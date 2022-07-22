import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataService } from '../services/local-data.service';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-operator-log',
  templateUrl: './create-operator-log.component.html',
  styleUrls: ['./create-operator-log.component.css']
})
export class CreateOperatorLogComponent implements OnInit {
  

  startRunTimeError = '';
  pauseRunTimeError = '';
  qtyDoneError = '';

  timeStartRunTime = { hour: 13, minute: 30 };
  timePauseRunTime = {hour: 13, minute: 30};
  meridian = true;    

  operationStatusCollection: Array<any>;
  workOrders: Array<any>;
  operations: Array<any>;
  opQtyData;

  oprLogForm: FormGroup;
  submitted = false;
  oprLogModel = {
    workOrderId: 0,
    operationId: 0,
    operationStatus: 0,
    opStartRunTime: undefined,
    opPauseRunTime: undefined,
    opQtyDone: 0,    
    userId: '',
    operatorId: 0,
  };

  apiResponse = '';  
  responseColor = '';
  modelErrors = [];

  constructor( private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {   

    this.oprLogForm = this.fb.group({
      WorkOrderId: ['', Validators.required],
      OperationId: ['', Validators.required],
      OperationStatus: ['', [Validators.required]],      
      OpStartRunTime: [''],
      OpStartRunTime1: [''],   
      OpPauseRunTime: [''],
      OpPauseRunTime1: [''],
      OpQtyDone: ['', [Validators.pattern("^[0-9]*$")]],   
    });   
  
    this.operationStatusCollection = this.localDataService.getOperationStatusToDisplayForOperator();
    this.getWorkOrderList();

    this.oprLogForm.controls.OpPauseRunTime1.disable();
    this.oprLogForm.controls.OpStartRunTime1.disable();
  }

  
  getWorkOrderList() {
    this.dataService.getWorkOrderList()
      .subscribe(
        data => {
          this.workOrders = data;
        },
        error => {
          console.log(error);
          /*
          if (error.status === 401)            
            this.apiResponse = 'Un-Authorized !';
          else
            this.apiResponse = 'Error !';
          
          this.responseColor = 'red';
          this.workOrders = [];  
          */
        }
      );
  }
  
  getOperationList(e) {
    console.log(e.target.value);
    this.operations = [];
    this.oprLogForm.controls['OperationId'].setValue('');
    this.opQtyData = '';

    this.dataService.getOperationList(e.target.value)
      .subscribe(
        data => {     
          this.operations = data;
        },
        error => {
          console.log(error);
          /*
          if (error.status === 401)            
            this.apiResponse = 'Un-Authorized !';
          else
            this.apiResponse = 'Error !';
          
          this.responseColor = 'red';
          this.workOrders = [];     
          */
        });
  }
  getOpQtyData(e) {
    if (e.target.value !== '') {
      this.dataService.getOperationQtyData(e.target.value)
      .subscribe(
        data => {          
          if (data.statusCode !== -1)
            this.opQtyData = "[ Qty Done : " + data.qtyDone + ", Qty Req : " + data.qtyRequired + " ]";
          else
            this.opQtyData = data.message;
        },
        error => {
          console.log(error);
        });
    }
    else
      return; 
  }
  get oprLogFormControl() {
    return this.oprLogForm.controls;
  }

  resetOprLog() {    
    this.oprLogForm.reset();

    this.timeStartRunTime = { hour: 13, minute: 30 };
    this.timePauseRunTime = {hour: 13, minute: 30};
    this.meridian = true;       
    
    /*
    this.oprLogForm.controls['OperationId'].setValue('');
    this.oprLogForm.controls['WorkOrderId'].setValue('');
    this.oprLogForm.controls['OperationStatus'].setValue('');
    */
    this.opQtyData = '';
    this.submitted = false;

    this.modelErrors = [];
    this.apiResponse = '';

    this.oprLogForm.controls.OpPauseRunTime.disable();
    this.oprLogForm.controls.OpPauseRunTime1.disable();
    this.oprLogForm.controls.OpStartRunTime.disable();
    this.oprLogForm.controls.OpStartRunTime1.disable();
  } 

  goBack() {
    this.router.navigate(['/home']);
  }

  checkForNumbersOnly(newVal) {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal))
      // console.log('ok');
      return true;
    else
      // console.log('Only Numbers Allowed !!!');
      return false;
  }

  setVisibility(e) {
    console.log(e.target.value);
    this.oprLogForm.controls['OpQtyDone'].setValue('');
    if (e.target.value === "0") {     
      this.oprLogForm.controls.OpPauseRunTime.disable();
      this.oprLogForm.controls.OpPauseRunTime1.disable();

      this.oprLogForm.controls.OpStartRunTime.enable();
      this.oprLogForm.controls.OpStartRunTime1.enable();      
    }
    else {
      this.oprLogForm.controls.OpPauseRunTime.enable();
      this.oprLogForm.controls.OpPauseRunTime1.enable();

      this.oprLogForm.controls.OpStartRunTime.disable();
      this.oprLogForm.controls.OpStartRunTime1.disable();
    }
  }

  onSubmit(): void {

    this.submitted = true;
    
    if (this.oprLogForm.valid) {
      

      this.oprLogModel.opQtyDone = this.oprLogForm.value["OpQtyDone"];
      this.oprLogModel.workOrderId = this.oprLogForm.value["WorkOrderId"];
      this.oprLogModel.operationId = this.oprLogForm.value["OperationId"];
      this.oprLogModel.operationStatus = this.oprLogForm.value["OperationStatus"];
 
      // start_running
      if (this.oprLogForm.value["OperationStatus"] === "0") {
        
        this.oprLogModel.opQtyDone = 0;

        if (this.oprLogForm.value["OpStartRunTime"] !== "" && this.oprLogForm.value["OpStartRunTime"] !== undefined) {

          console.log('start run time date ,,,', this.oprLogForm.value["OpStartRunTime"]);

          var opStartRunTimeDateObj = this.oprLogForm.value["OpStartRunTime"];
                  
          var date = new Date(opStartRunTimeDateObj);
          date.setHours(this.timeStartRunTime.hour-5, this.timeStartRunTime.minute, 0);   // Set hours, minutes and seconds
          console.log(date.toString());

          // this.oprLogModel.opStartRunTime = new Date(date).toISOString();
          this.oprLogModel.opStartRunTime = date;
          this.oprLogModel.opPauseRunTime = null;
        }
        else {
          console.log('form-invalid,,, need start-run-time!!!');
          this.startRunTimeError = 'Need Start-Run-Time!';
          this.pauseRunTimeError = '';
          // return;
        }
      }
    
      // pause_running
      if (this.oprLogForm.value["OperationStatus"] === "1") {
        if (this.oprLogForm.value["OpPauseRunTime"] !== "" && this.oprLogForm.value["OpPauseRunTime"] !== undefined) {
          var opPauseRunTimeDateObj = this.oprLogForm.value["OpPauseRunTime"];
                 
          var date = new Date(opPauseRunTimeDateObj);
          date.setHours(this.timePauseRunTime.hour-5, this.timePauseRunTime.minute, 0);   // Set hours, minutes and seconds
          console.log(date.toString());

          // this.oprLogModel.opPauseRunTime = new Date(date).toISOString();
          this.oprLogModel.opPauseRunTime = date;
          this.oprLogModel.opStartRunTime = null;
          this.pauseRunTimeError = '';
        }
        else {
          console.log('form-invalid,,, need pause-run-time!!!');
          this.pauseRunTimeError = 'Need Pause-Run-Time!';
          this.startRunTimeError = '';
          // return;
        }

        if (this.oprLogForm.value["OpQtyDone"] !== "") {
          this.oprLogModel.opQtyDone = Number(this.oprLogForm.value["OpQtyDone"]);
          this.qtyDoneError = '';
        }
        else {
          console.log('form-invalid,,, need qty-done!!!');
          this.qtyDoneError = 'Need Qty-Done!';
          // return;
        }

        // comment below to check for server side model validation
        // if (this.pauseRunTimeError !== '' || this.qtyDoneError !== '')
          // return;
      }

      console.log('form valid!');
      this.pauseRunTimeError = '';
      this.startRunTimeError = '';

      this.oprLogModel.userId = this.localDataService.getMyUserId();

      console.log(this.oprLogModel);

      this.dataService.createOperatorLog(this.oprLogModel)
        .subscribe(
          response => {
            this.modelErrors = [];
            this.apiResponse = '';

            console.log(response);

            if(response.responseCode===0){
              // success    
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';
              
              setTimeout(() => {              
                this.resetOprLog();    
              }, 2000);  
            }
            else{
              // -1
              // server error
              this.apiResponse = response.responseCode + ' : ' + response.responseMessage;
              this.responseColor = 'red';
            }
          },
          error => {
            // console.log(error);
            this.modelErrors = [];
            this.apiResponse = '';
            this.responseColor = 'red';

            if (error.status === 401)            
              this.apiResponse = 'Un-Authorized !';
            else if (error.status === 400) {
              this.apiResponse = '';
              this.modelErrors = this.localDataService.display400andEx(error, 'Operator-Log-Create');
            }
            else
              this.apiResponse = 'Error !';            
          }
        );

    }
    else {
      console.log('form in-valid!');
    }
    
  } 
}
