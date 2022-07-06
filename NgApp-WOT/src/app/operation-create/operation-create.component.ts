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
      OpQTYRequired: [''],
      Details: [''],
    });   
    this.operationStatusCollection = this.localDataService.getOperationStatusToDisplay();

    console.log('creating new operation for work-order #', this.woId);
  }

  get opFormControl() {
    return this.opForm.controls;
  }

  resetWo() {    
    this.opForm.reset();
    this.submitted = false;
  } 

}
