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
  workOrderStatusCollection: Array<any>;

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
    this.workOrderStatusCollection = this.localDataService.getWorkOrderStatusToDisplay();
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

      this.woModel.customerOrderId = this.woForm.value["CustomerOrderId"];
      this.woModel.workOrderStatus = this.woForm.value["WorkOrderStatus"];
      this.woModel.statusNote = this.woForm.value["StatusNote"];
      this.woModel.workOrderStartDate = new Date(this.woForm.value["WorkOrderStartDate"].year + '/' + this.woForm.value["WorkOrderStartDate"].month + '/' + this.woForm.value["WorkOrderStartDate"].day);
     
      console.log(this.woModel);

      // check for server side model errors
      // this.woModel.customerOrderId = '';
      this.dataService.createWorkOrder(this.woModel)
        .subscribe(
          response => {
            this.modelErrors = [];
            this.apiResponse = '';

            console.log(response);

            if(response.responseCode===0){
              // success    
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';
              this.resetWo();
              this.submitted = false;

              
              setTimeout(() => {
                this.apiResponse = ''; 
                this.router.navigate(['/work-order']);
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
              this.modelErrors = this.localDataService.display400andEx(error, 'Work-Order-Create');
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
