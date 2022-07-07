import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-work-order-edit',
  templateUrl: './work-order-edit.component.html',
  styleUrls: ['./work-order-edit.component.css']
})
export class WorkOrderEditComponent implements OnInit {

  workOrderStatusCollection: Array<any>;
  
  woId: string;
  coId: string;

  woForm: FormGroup;
  submitted = false;
  woModel = {
    workOrderId: 0,
    customerOrderId: 0,
    workOrderStartDate: new Date(),
    workOrderStatus: 0,
    statusNote: '',
  };

  apiResponse = '';
  responseColor = '';
  modelErrors = [];
  
  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {
     this.woForm = this.fb.group({
        WorkOrderStartDate: [''],
        WorkOrderStatus: ['', [Validators.required]],      
        StatusNote: [''],
     });
    
    this.workOrderStatusCollection = this.localDataService.getWorkOrderStatusToDisplay();

    this.woId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.woId)) {
      console.log('Not a Number!');
      this.router.navigate(['/work-order']);
    }
    else {
      this.dataService.getWorkOrder(Number(this.woId))
        .subscribe(
          data => {
            if(data===null){
              console.log('work-order not found!');
           
              this.apiResponse = 'Work-Order Not Found!';
              this.responseColor = 'red';
            }
            else{
              this.apiResponse = '';
              this.responseColor = 'green';       

              if (data.workOrderStartDate === null) {
                 this.woForm.setValue({                
                  WorkOrderStatus: data.workOrderStatus,
                  StatusNote: data.statusNote,           
                  WorkOrderStartDate: new Date(),
                });
              }
              else {
                  this.woForm.setValue({                
                  WorkOrderStatus: data.workOrderStatus,
                  StatusNote: data.statusNote,           
                  WorkOrderStartDate: new Date(Date.parse(data.workOrderStartDate)),
                });
              }


           
              this.coId = data.customerOrderId;
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

  get woFormControl() {
    return this.woForm.controls;
  }
  
  goBack() {
    this.router.navigate(['/work-order']);
  }
  
  onSubmit(): void {
    this.submitted = true;
    if (this.woForm.valid) {
      console.log('form valid!');     
    
      this.woModel.statusNote = this.woForm.value["StatusNote"];   
      this.woModel.workOrderStatus = this.woForm.value["WorkOrderStatus"];   
      this.woModel.workOrderStartDate = this.woForm.value["WorkOrderStartDate"];
      this.woModel.workOrderId = Number(this.woId);
      this.woModel.customerOrderId = Number(this.coId);
      console.log(this.woModel);  

      this.dataService.editWorkOrder(this.woModel)
        .subscribe(
          response => {
            console.log(response);
            this.modelErrors = [];
            this.apiResponse = '';

            if (response.responseCode === 0) {              
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
    else {
      console.log('form in-valid!');
    }
  }
  
  resetWo(){
    this.woForm.reset();
    this.submitted = false;
  }

}
