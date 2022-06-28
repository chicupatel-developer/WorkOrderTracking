import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-customer-order-edit',
  templateUrl: './customer-order-edit.component.html',
  styleUrls: ['./customer-order-edit.component.css']
})
export class CustomerOrderEditComponent implements OnInit {

  coId: string;

  coForm: FormGroup;
  submitted = false;
  coModel = { 
    customerOrderId: 0,
    customerName: '',
    productName: '',
    productDesc: '',
    orderQuantity: 0,
    orderDate: new Date(),
    orderDueDate: new Date(),
  };

  apiResponse = '';
  responseColor = '';
  modelErrors = [];
  
  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {
     this.coForm = this.fb.group({
        CustomerName: ['', Validators.required],
        ProductName: ['', Validators.required],
        ProductDesc: [''],
        OrderQuantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],      
        OrderDate: ['',[Validators.required]],
        OrderDueDate: ['', Validators.required],
     });
    
    this.coId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.coId)) {
      console.log('Not a Number!');
      this.router.navigate(['/customer-order']);
    }
    else {
      this.dataService.getCustomerOrder(Number(this.coId))
        .subscribe(
          data => {
            if(data===null){
              console.log('customer-order not found!');
           
              this.apiResponse = 'Customer-Order Not Found!';
              this.responseColor = 'red';
            }
            else{
              this.apiResponse = '';
              this.responseColor = 'green';       
          
              this.coForm.setValue({
                CustomerName: data.customerName,
                ProductName: data.productName,
                ProductDesc: data.productDesc,
                OrderQuantity: data.orderQuantity,                
                OrderDate: new Date(Date.parse(data.orderDate)),
                OrderDueDate: new Date(Date.parse(data.orderDueDate)),
              });

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
          });
    }
  }

  get coFormControl() {
    return this.coForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.coForm.valid) {
      
      this.coModel.customerName = this.coForm.value["CustomerName"];
      this.coModel.productName = this.coForm.value["ProductName"];
      this.coModel.productDesc = this.coForm.value["ProductDesc"];      
      this.coModel.orderQuantity = Number(this.coForm.value["OrderQuantity"]);
      // this.coModel.orderDate = new Date(this.coForm.value["OrderDate"].year + '/' + this.coForm.value["OrderDate"].month + '/' + this.coForm.value["OrderDate"].day);
      // this.coModel.orderDueDate = new Date(this.coForm.value["OrderDueDate"].year + '/' + this.coForm.value["OrderDueDate"].month + '/' + this.coForm.value["OrderDueDate"].day);
      this.coModel.orderDate = this.coForm.value["OrderDate"];
      this.coModel.orderDueDate = this.coForm.value["OrderDueDate"];
      this.coModel.customerOrderId = Number(this.coId);

      console.log(this.coModel);

      this.dataService.editCustomerOrder(this.coModel)
        .subscribe(
          response => {
            this.modelErrors = [];
            this.apiResponse = '';

            if (response.responseCode === 0) {              
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

            if (error.status == 401)            
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
    else {
      console.log('form in-valid!');
    }
  }
  
  resetCo(){
    this.coForm.reset();
    this.submitted = false;
  }

}
