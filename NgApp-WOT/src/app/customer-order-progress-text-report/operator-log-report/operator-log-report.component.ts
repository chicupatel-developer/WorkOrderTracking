import { Component, OnInit, Input } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-operator-log-report',
  templateUrl: './operator-log-report.component.html',
  styleUrls: ['./operator-log-report.component.css']
})
export class OperatorLogReportComponent implements OnInit {

  @Input() operatorLogData = {
    operator: {
      firstName: '',
      lastName: '',     
    },
    operationId: 0,
    operationNumber: 0,
    operationStatus: 0,
    opQtyDone: 0,
    opStartRunTime: null,
    opPauseRunTime: null,
    cycleTime: null,
  };

  constructor(public localDataService: LocalDataService)
  { }

  ngOnInit(): void {
    console.log(this.operatorLogData);
  }

}
