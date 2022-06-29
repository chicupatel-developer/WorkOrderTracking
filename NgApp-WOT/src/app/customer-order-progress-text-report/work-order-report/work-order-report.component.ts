import { Component, OnInit, Input } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-work-order-report',
  templateUrl: './work-order-report.component.html',
  styleUrls: ['./work-order-report.component.css']
})
export class WorkOrderReportComponent implements OnInit {

   @Input() workOrderData = {
    workOrderId: 0,
    workOrderStatus: 0,
    workOrderStartDate: null,
   };
  
  constructor(public localDataService: LocalDataService)
  { }


  ngOnInit(): void {
    console.log(this.workOrderData);
  }

}
