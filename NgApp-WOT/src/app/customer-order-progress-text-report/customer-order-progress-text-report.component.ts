import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-customer-order-progress-text-report',
  templateUrl: './customer-order-progress-text-report.component.html',
  styleUrls: ['./customer-order-progress-text-report.component.css']
})
export class CustomerOrderProgressTextReportComponent implements OnInit {

  apiResponse = '';
  responseColor = '';

  coId: string;
  customerOrder: {};
  workOrder: {};
  operationDatas: [];

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {       
    this.coId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.coId)) {
      console.log('Not a Number!');
      this.router.navigate(['/customer-order']);
    }
    else {
       this.dataService.getCustomerOrderProgressTextReport(Number(this.coId))
        .subscribe(
          data => {
            this.apiResponse = '';
            this.responseColor = 'green';    
            
            console.log(data);
            this.customerOrder = data.customerOrder;
            this.workOrder = data.workOrder;
            this.operationDatas = data.operationDatas;
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

}
