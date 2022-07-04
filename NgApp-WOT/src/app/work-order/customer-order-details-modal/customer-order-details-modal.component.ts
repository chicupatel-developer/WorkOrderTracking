import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-order-details-modal',
  templateUrl: './customer-order-details-modal.component.html',
  styleUrls: ['./customer-order-details-modal.component.css']
})
export class CustomerOrderDetailsModalComponent implements OnInit {

  @Input() customerOrderDetails;

  
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
