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
  
    this.operationStatusCollection = this.localDataService.getOperationStatusForOperatorToDisplay();
    this.getWorkOrderList();
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
    this.oprLogForm.controls['OperationId'].setValue('');
    this.opQtyData = '';
    this.submitted = false;
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
    // if(e.target.value===)
  }

  onSubmit(): void {

    this.submitted = true;
    
    if (this.oprLogForm.valid) {
      console.log('form valid!');

      this.oprLogModel.opQtyDone = this.oprLogForm.value["OpQtyDone"];
      this.oprLogModel.workOrderId = this.oprLogForm.value["WorkOrderId"];
      this.oprLogModel.operationId = this.oprLogForm.value["OperationId"];
      this.oprLogModel.operationStatus = this.oprLogForm.value["OperationStatus"];
 
      if (this.oprLogForm.value["OpStartRunTime"] !== "" && this.oprLogForm.value["OpStartRunTime"] !== undefined) {

        console.log('start run time date ,,,',this.oprLogForm.value["OpStartRunTime"]);

        var opStartRunTimeDateObj = this.oprLogForm.value["OpStartRunTime"];
                 
        var date = new Date(opStartRunTimeDateObj);
        date.setHours(this.timeStartRunTime.hour, this.timeStartRunTime.minute, 0);   // Set hours, minutes and seconds
        console.log(date.toString());

        this.oprLogModel.opStartRunTime = date;
      }

      if (this.oprLogForm.value["OpPauseRunTime"] !== "") {
        var opPauseRunTimeDateObj = this.oprLogForm.value["OpPauseRunTime"];
                 
        var date = new Date(opPauseRunTimeDateObj);
        date.setHours(this.timePauseRunTime.hour, this.timePauseRunTime.minute, 0);   // Set hours, minutes and seconds
        console.log(date.toString());

        this.oprLogModel.opPauseRunTime = date;
      }
     


     

      
      console.log(this.oprLogModel);

    }
    else {
      console.log('form in-valid!');
    }
    
  } 
}
