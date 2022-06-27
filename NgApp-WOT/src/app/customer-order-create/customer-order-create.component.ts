import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-customer-order-create',
  templateUrl: './customer-order-create.component.html',
  styleUrls: ['./customer-order-create.component.css']
})
export class CustomerOrderCreateComponent implements OnInit {

  coForm: FormGroup;
  submitted = false;
  coModel = {
    customerName: '',
    productName: '',
    productDesc: '',
    orderQuantity: 0,
    orderDate: '',
    orderDueDate: '',
  };

  apiResponse = '';  
  responseColor = '';

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.coForm = this.fb.group({
      CustomerName: ['', Validators.required],
      ProductName: ['', Validators.required],
      ProductDesc: [''],
      OrderQuantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      OrderDate: ['', Validators.required],
      OrderDueDate: ['', Validators.required],
    });
  }

  get coFormControl() {
    return this.coForm.controls;
  }

  resetCo() {    
    this.coForm.reset();
    this.submitted = false;
  }

  checkForNumbersOnly(newVal) {
    /*
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal))
      console.log('ok');
    else
      console.log('Only Numbers Allowed !!!');
    */
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.coForm.valid) {
      this.coModel.customerName = this.coForm.value["CustomerName"];
      this.coModel.productName = this.coForm.value["ProductName"];
      this.coModel.productDesc = this.coForm.value["ProductDesc"];
      this.coModel.orderQuantity = Number(this.coForm.value["OrderQuantity"]);
      this.coModel.orderDate = this.coForm.value["OrderDate"];
      this.coModel.orderDueDate = this.coForm.value["OrderDueDate"];

      console.log(this.coModel);
      /*
      this.dataService.createCustomerOrder(this.coModel)
        .subscribe(
          response => {
            console.log(response);

            if(response.responseCode==0){
              // success    
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';
              this.resetCo();
              this.submitted = false;

              
              setTimeout(() => {
                this.apiResponse = ''; 
                this.router.navigate(['/customer-order']);
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
            console.log(error);

            if (error.status == 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          }
        );
      */
    }
    else {
      console.log('form in-valid!');
    }
  } 
}
