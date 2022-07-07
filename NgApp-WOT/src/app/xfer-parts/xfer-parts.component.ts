import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-xfer-parts',
  templateUrl: './xfer-parts.component.html',
  styleUrls: ['./xfer-parts.component.css']
})
export class XferPartsComponent implements OnInit {

  opId: string;
  woId: number;

  xferInfo: {
    customerName: '',
    customerOrderId: 0,
    customerOrderQTY: 0,
    operationNumber: 0,
    workOrderId: 0,
  };
  parts: [{ text: '', value: ''}];

  xferForm: FormGroup;
  submitted = false;
  xferModel = {
    operationId: 0,
    partId:0, 
    xFERQTY: 0,
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

    this.opId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.opId)) {
      console.log('Not a Number!');
      this.router.navigate(['/work-order']);
    }
    else {

      this.xferForm = this.fb.group({      
        PartId: ['', [Validators.required]],  
        XFERQTY: ['', [Validators.pattern("^[0-9]*$")]], 
      });   
    
      this.getParts();
      this.getOperationDetails(Number(this.opId));
    }
  }

  getParts() {
    this.dataService.getPartList()
        .subscribe(
          data => {           
            console.log(data);
            this.parts = data;
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

  getOperationDetails(opId) {
    this.dataService.getOperationDetails(opId)
        .subscribe(
          data => {           
            console.log(data);
            this.xferInfo = data;
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

  get xferFormControl() {
    return this.xferForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.xferForm.value["PartId"]==='' ||  this.xferForm.value["PartId"]===null) {
      console.log('form in-valid!');
      return;
    }  
      
    if (!this.checkForNumbersOnly(this.xferForm.value["XFERQTY"])) {      
      console.log('form in-valid!');
      return;
    } 

    if (this.xferForm.value["XFERQTY"] === '')
      this.xferModel.xFERQTY = 0;
    else
      this.xferModel.xFERQTY = this.xferForm.value["XFERQTY"];        
      
 
    this.xferModel.operationId = Number(this.opId);
    this.xferModel.partId = this.xferForm.value["PartId"];        
        
    console.log(this.xferModel);  
 
  }
  
  resetXfer(){
    this.xferForm.reset();
    this.submitted = false;
  }
}
