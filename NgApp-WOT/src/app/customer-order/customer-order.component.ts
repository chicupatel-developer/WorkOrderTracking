import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {

  term: string;
  
  cos: Array<any>;

  apiResponse = '';  
  responseColor = '';
  responseClass = '';
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadCos();  
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadCos();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadCos();
  }

  loadCos(){
    this.dataService.allCustomerOrders()
      .subscribe(
        data => {          
          console.log(data);

          this.cos = data;
          this.responseColor = 'green';
          this.apiResponse = 'Success!';
          this.responseClass = 'successResponse';

          console.log(this.cos);
        },
        error => {
          console.log(error);
          if (error.status == 401)            
            this.apiResponse = 'Un-Authorized !';
          else
            this.apiResponse = 'Error !';
          
          this.responseColor = 'red';
          this.responseClass = 'errorResponse';
          this.cos = [];      
      });
  }

  editCo(co) {
    this.router.navigate(['/customer-order-edit/'+ co.customerOrderId]);
  }

  removeCo(co) {
    this.router.navigate(['/customer-order-remove/'+ co.customerOrderId]);
  }

  coProgressReport(co) {
    this.router.navigate(['/customer-order-progress-text-report/'+ co.customerOrderId]);
  }
  
  createCo() {
    console.log('new customer-order!');
    setTimeout(() => {
      this.router.navigate(['/customer-order-create']);
    }, 500);
  }

}
