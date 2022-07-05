import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-work-order-remove',
  templateUrl: './work-order-remove.component.html',
  styleUrls: ['./work-order-remove.component.css']
})
export class WorkOrderRemoveComponent implements OnInit {

  woId: string;
  wo: any;
  
  apiResponse = '';
  responseColor = '';

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {   
    
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
                         
              this.wo = data;              
            }
          },
          error => {
            console.log(error);
            
            if (error.status === 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          });
    }
  }

  removeWo(wo) {
    this.dataService.removeWorkOrder(wo)
        .subscribe(
          response => {

            if (response.responseCode === 0) {
              
              // success
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';           
              
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

            if (error.status === 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          }
        );
  }

  cancelRemoveWo() {
     this.router.navigate(['/work-order']);
  }


}
