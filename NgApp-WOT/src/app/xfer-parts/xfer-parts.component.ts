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
  parts: [];

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
}
