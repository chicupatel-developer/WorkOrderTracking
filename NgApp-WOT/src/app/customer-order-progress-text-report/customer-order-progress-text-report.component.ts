import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';
import { CustomerOrderReportComponent } from './customer-order-report/customer-order-report.component';
import { WorkOrderReportComponent } from './work-order-report/work-order-report.component';
import { OperationReportComponent } from './operation-report/operation-report.component';

import { ChartType } from "angular-google-charts";

@Component({
  selector: 'app-customer-order-progress-text-report',
  templateUrl: './customer-order-progress-text-report.component.html',
  styleUrls: ['./customer-order-progress-text-report.component.css']
})
export class CustomerOrderProgressTextReportComponent implements OnInit {

  myType = ChartType.BarChart;
  chartData = {
      data: [
      ["PHP Books",  500],
      [".Net Books",  800],
      ["Java Books",  400],
   ],
   chartColumns: ['Books', 'Sell'],
   width: 1000,
   height: 400
  };

  apiResponse = '';
  responseColor = '';

  coId: string;
  customerOrder = {
    customerOrderId: 0,
    customerName: '',
    orderQuantity: 0,
    orderDate: null,
    orderDueDate: null,
  };
  workOrder = {
    workOrderId: 0,
    workOrderStatus: 0,
    workOrderStartDate: null,
  };
  operationData: [];


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
            this.operationData = data.operationDatas;
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

  displayOperationProgress() {
    console.log('getting chart data');

    this.dataService.getCustomerOrderProgressChartReport(Number(this.coId))
      .subscribe(
        data => {
          console.log(data);          
        },
        error => {
          console.log(error);         
        }
    );
  }
}
