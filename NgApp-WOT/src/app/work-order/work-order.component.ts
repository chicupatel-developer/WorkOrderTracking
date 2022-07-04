import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { CustomerOrderDetailsModalComponent } from './customer-order-details-modal/customer-order-details-modal.component';


@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  term: string;
  
  wos: Array<any>;

  apiResponse = '';  
  responseColor = '';
  responseClass = '';
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  coDetails = {};
  closeResult: string = '';

  constructor(private modalService: NgbModal, public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadWos();  
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadWos();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadWos();
  }

  loadWos(){
    this.dataService.allWorkOrders()
      .subscribe(
        data => {          
          console.log(data);

          this.wos = data;
          this.responseColor = 'green';
          this.apiResponse = 'Success!';
          this.responseClass = 'successResponse';

          console.log(this.wos);
        },
        error => {
          console.log(error);
          if (error.status == 401)            
            this.apiResponse = 'Un-Authorized !';
          else
            this.apiResponse = 'Error !';
          
          this.responseColor = 'red';
          this.responseClass = 'errorResponse';
          this.wos = [];      
      });
  }

  editWo(wo) {
    this.router.navigate(['/work-order-edit/'+ wo.workOrderId]);
  }

  removeWo(wo) {
    this.router.navigate(['/work-order-remove/'+ wo.workOrderId]);
  }
  
  createWo() {
    console.log('new work-order!');
    setTimeout(() => {
      this.router.navigate(['/work-order-create']);
    }, 500);
  }

  connectWithOperations(wo) {
    console.log(wo.workOrderId);
  }

  getCustomerOrderDetails(coId) {
    console.log(coId);

    this.dataService.getCustomerOrderDetails(coId)
      .subscribe(
        data => {          
          if (data === "") {
            // data not found on server!
            this.coDetails = {};
          } else {
            console.log(data);
            this.coDetails=data;

            // CustomerOrderDetailsModalComponent is component name where modal is declare
            const modalRef = this.modalService.open(CustomerOrderDetailsModalComponent);
            modalRef.componentInstance.customerOrderDetails = data;
            modalRef.result.then((result) => {
              console.log(result);
            }).catch((error) => {
              console.log(error);
            });
          }
        },
        error => {
          console.log(error);
        }
      );
  }


}
