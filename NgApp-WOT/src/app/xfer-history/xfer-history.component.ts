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

  constructor(private activeModal: NgbActiveModal, public localDataService: LocalDataService,) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }


}
