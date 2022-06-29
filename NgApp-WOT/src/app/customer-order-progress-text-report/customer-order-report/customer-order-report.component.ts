import { Component, OnInit, Input } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-customer-order-report',
  templateUrl: './customer-order-report.component.html',
  styleUrls: ['./customer-order-report.component.css']
})
export class CustomerOrderReportComponent implements OnInit {

  @Input() customerOrderData = {
    customerOrderId: 0,
    customerName: '',
    orderQuantity: 0,
    orderDate: null,
    orderDueDate: null,
  };

  constructor(public localDataService: LocalDataService)
  { }

  ngOnInit(): void {
    console.log(this.customerOrderData);
  }

}
