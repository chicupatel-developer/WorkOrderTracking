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
          
              this.woForm.setValue({                
                WorkOrderStatus: data.workOrderStatus,
                StatusNote: data.statusNote,           
                WorkOrderStartDate: new Date(Date.parse(data.workOrderStartDate)),
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

  get woFormControl() {
    return this.woForm.controls;
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
  
  resetWo(){
    this.woForm.reset();
    this.submitted = false;
  }

}
