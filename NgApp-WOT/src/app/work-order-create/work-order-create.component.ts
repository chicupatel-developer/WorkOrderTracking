import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-work-order-create',
  templateUrl: './work-order-create.component.html',
  styleUrls: ['./work-order-create.component.css']
})
export class WorkOrderCreateComponent implements OnInit {

  customerOrders: Array<any>;
  
  woForm: FormGroup;
  submitted = false;
  woModel = {
    customerOrderId: '',
    workOrderStartDate: new Date(),
    workOrderStatus: 0,
    statusNote: '',
  };

  apiResponse = '';  
  responseColor = '';
  modelErrors = [];

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.woForm = this.fb.group({
      CustomerOrderId: ['', Validators.required],
      WorkOrderStartDate: ['', Validators.required],
      WorkOrderStatus: ['', [Validators.required]],      
      StatusNote: [''],
    });

    this.getCustomerOrders();
  }

  getCustomerOrders() {
    this.dataService.getCustomerOrders()
      .subscribe(
        data => {
          this.customerOrders = data;
        },
        error => {
          console.log(error);
        }
      );
  }
  
  get woFormControl() {
    return this.woForm.controls;
  }

  resetWo() {    
    this.woForm.reset();
    this.submitted = false;
  } 

  onSubmit(): void {

    this.submitted = true;

    if (this.woForm.valid) {
      console.log('form valid!');    
    }
    else {
      console.log('form in-valid!');
    }
  } 

}
