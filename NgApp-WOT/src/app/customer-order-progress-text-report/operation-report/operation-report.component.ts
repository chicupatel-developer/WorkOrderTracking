import { Component, OnInit, Input } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { OperatorLogReportComponent } from '../operator-log-report/operator-log-report.component';

@Component({
  selector: 'app-operation-report',
  templateUrl: './operation-report.component.html',
  styleUrls: ['./operation-report.component.css']
})
export class OperationReportComponent implements OnInit {

  @Input() operationData = {
    operation : {
      opQTYDone: 0,
      opQTYRequired: 0,
      operationId: 0,
      operationNumber: 0,
      operationStatus: 0,
      details: '',
      operationStartDate: null,
    },
    operationHistory : []
  };

  constructor(public localDataService: LocalDataService)
  { }

  ngOnInit(): void {
    console.log(this.operationData);
  }

}
