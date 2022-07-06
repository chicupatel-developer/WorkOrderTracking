import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.css']
})
export class OperationCreateComponent implements OnInit {

  woId: number;

  operationStatusCollection: Array<any>;
  operationNumberCollection: Array<any>;

  opForm: FormGroup;
  submitted = false;
  opModel = {
    workOrderId: 0,
    operationNumber: 0,
    operationStatus: 0,
    operationStartDate: new Date(),
    opQTYRequired: 0,
    details: '',
  };

  apiResponse = '';  
  responseColor = '';
  modelErrors = [];

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {

    this.woId = this.localDataService.getWorkOrderId();
    if (this.woId===null || isNaN(+this.woId)) {
      console.log('Invalid Work-Order!');
      this.router.navigate(['/work-order']);
    }

    this.opForm = this.fb.group({
      OperationNumber: ['', Validators.required],
      OperationStatus: ['', [Validators.required]],      
      OperationStartDate: [''],
      OpQTYRequired: ['', [Validators.pattern("^[0-9]*$")]],      
      Details: [''],
    });   
    this.operationStatusCollection = this.localDataService.getOperationStatusToDisplay();
    this.operationNumberCollection = this.localDataService.getOperationNumberToDisplay();

    console.log('creating new operation for work-order #', this.woId);
  }

  get opFormControl() {
    return this.opForm.controls;
  }

  resetOp() {    
    this.opForm.reset();
    this.submitted = false;
  } 

  goBack() {
    this.router.navigate(['/operation/'+this.woId]);
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
  onSubmit(): void {

    this.submitted = true;
    
    if (this.opForm.value["OperationNumber"] === '' || this.opForm.value["OperationNumber"] === null || this.opForm.value["OperationStatus"]==='' ||  this.opForm.value["OperationStatus"]===null) {
      console.log('form in-valid!');
      return;
    }
    else if (this.opForm.value["OperationStartDate"] === '' || this.opForm.value["OperationStartDate"] === null) {
      this.opModel.operationStartDate = null;
    }
    else if (this.opForm.value["OperationStartDate"] !== '') {
      this.opModel.operationStartDate = new Date(this.opForm.value["OperationStartDate"].year + '/' + this.opForm.value["OperationStartDate"].month + '/' + this.opForm.value["OperationStartDate"].day);
    }  
      
    if (!this.checkForNumbersOnly(this.opForm.value["OpQTYRequired"])) {      
      console.log('form in-valid!');
      return;
    } 
    else {
      this.opModel.opQTYRequired = Number(this.opForm.value["OpQTYRequired"]);
    }

    this.opModel.workOrderId = this.woId;
    this.opModel.operationNumber = this.opForm.value["OperationNumber"];
    this.opModel.operationStatus = this.opForm.value["OperationStatus"];        
    this.opModel.details = this.opForm.value["Details"];        
    
  
    console.log(this.opModel);  
    this.dataService.createOperation(this.opModel)
        .subscribe(
          response => {
            this.modelErrors = [];
            this.apiResponse = '';

            console.log(response);

            if(response.responseCode===0){
              // success    
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';
              this.resetOp();
              this.submitted = false;

              
              setTimeout(() => {
                this.apiResponse = ''; 
                this.router.navigate(['/operation/'+this.woId]);
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
              this.modelErrors = this.localDataService.display400andEx(error, 'Customer-Order-Create');
            }
            else
              this.apiResponse = 'Error !';            
          }
        );
    
    
  } 
}
