import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.css']
})
export class OperationEditComponent implements OnInit {
  
  operationStatusCollection: Array<any>;

  opId: string;
  woId: number;
  operationNumber: number;

  opForm: FormGroup;
  submitted = false;
  opModel = {
    OperationId: 0,
    operationStatus: 0,
    operationStartDate: new Date(),
    opQTYRequired: 0,
    details: '',
  };

  apiResponse = '';  
  responseColor = '';
  modelErrors = [];
  
  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {

    this.woId = this.localDataService.getWorkOrderId();
    if (this.woId===null || isNaN(+this.woId)) {
      console.log('Invalid Work-Order!');
      this.router.navigate(['/work-order']);
    }

     this.opForm = this.fb.group({      
      OperationStatus: ['', [Validators.required]],      
      OperationStartDate: [''],
      OpQTYRequired: ['', [Validators.pattern("^[0-9]*$")]],      
      Details: [''],
    });   
    this.operationStatusCollection = this.localDataService.getOperationStatusToDisplay();    

    this.opId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.opId)) {
      console.log('Not a Number!');
      this.router.navigate(['/work-order']);
    }
    else {
      this.dataService.getOperation(Number(this.opId))
        .subscribe(
          data => {
            if (data === null) {
              console.log('operation not found!');
           
              this.apiResponse = 'Operation Not Found!';
              this.responseColor = 'red';
            }
            else {
              this.apiResponse = '';
              this.responseColor = 'green';

              this.operationNumber = data.operationNumber;

              if (data.operationStartDate === null) {
                this.opForm.setValue({
                  OperationStatus: data.operationStatus,
                  Details: data.details,
                  OperationStartDate: new Date(),
                  OpQTYRequired: data.opQTYRequired,
                });
              }
              else {
                this.opForm.setValue({
                  OperationStatus: data.operationStatus,
                  Details: data.details,
                  OperationStartDate: new Date(Date.parse(data.operationStartDate)),
                  OpQTYRequired: data.opQTYRequired,
                });
              }
              console.log(data);
            }
          },
          error => {
            console.log(error);

            if (error.status == 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          }
        );
    }
  }

  get opFormControl() {
    return this.opForm.controls;
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

    if (this.opForm.value["OperationStatus"]==='' ||  this.opForm.value["OperationStatus"]===null) {
      console.log('form in-valid!');
      return;
    }  
      
    if (!this.checkForNumbersOnly(this.opForm.value["OpQTYRequired"])) {      
      console.log('form in-valid!');
      return;
    } 
    else {
      this.opModel.opQTYRequired = Number(this.opForm.value["OpQTYRequired"]);
    }

    this.opModel.OperationId = Number(this.opId);
    this.opModel.operationStatus = this.opForm.value["OperationStatus"];        
    this.opModel.details = this.opForm.value["Details"];        
    this.opModel.operationStartDate = this.opForm.value["OperationStartDate"];
  
    console.log(this.opModel);  

    this.dataService.editOperation(this.opModel)
        .subscribe(
          response => {
            console.log(response);
            this.modelErrors = [];
            this.apiResponse = '';

            if (response.responseCode === 0) {              
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
            else {
              // -1
              // server error
              this.apiResponse = response.responseCode + ' : ' + response.responseMessage;
              this.responseColor = 'red';
            }
          },
          error => {
            console.log(error);

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
  
  resetOp(){
    this.opForm.reset();
    this.submitted = false;
  }

}
