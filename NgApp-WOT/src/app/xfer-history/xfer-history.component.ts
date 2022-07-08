import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-xfer-history',
  templateUrl: './xfer-history.component.html',
  styleUrls: ['./xfer-history.component.css']
})
export class XferHistoryComponent implements OnInit {

  @Input() partHistoryData;
  @Input() apiError;

  // partHistoryData.partList
  partList = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private activeModal: NgbActiveModal, public localDataService: LocalDataService,) {}

  ngOnInit(): void {
    this.loadPartXferData();  
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadPartXferData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadPartXferData();
  }

  loadPartXferData() {
    this.partList = this.partHistoryData.partList;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }


}
