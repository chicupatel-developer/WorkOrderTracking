import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-order-report',
  templateUrl: './customer-order-report.component.html',
  styleUrls: ['./customer-order-report.component.css']
})
export class CustomerOrderReportComponent implements OnInit {

  @Input() customerOrderData: {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.customerOrderData);
  }

}
