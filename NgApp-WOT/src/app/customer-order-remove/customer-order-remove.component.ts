import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-customer-order-remove',
  templateUrl: './customer-order-remove.component.html',
  styleUrls: ['./customer-order-remove.component.css']
})
export class CustomerOrderRemoveComponent implements OnInit {

  coId: string;
  co: any;
  
  apiResponse = '';
  responseColor = '';

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {   
    
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
                         
              this.co = data;              
            }
          },
          error => {
            console.log(error);
            /*
            if (error.status === 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
            */
          });
    }
  }

  removeCo(co) {
    this.dataService.removeCustomerOrder(co)
        .subscribe(
          response => {

            if (response.responseCode === 0) {
              
              // success
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';           
              
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

            if (error.status === 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          }
        );
  }

  cancelRemoveCo() {
     this.router.navigate(['/customer-order']);
  }

}
