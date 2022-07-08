import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-operation-log',
  templateUrl: './operation-log.component.html',
  styleUrls: ['./operation-log.component.css']
})
export class OperationLogComponent implements OnInit {

  opId: string;
  woId: number;
  opLog;
  
  apiError = '';  

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  
  constructor(public localDataService: LocalDataService, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {
    this.loadOpLog();     
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.loadOpLog();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadOpLog();
  }

  loadOpLog() {
    
    this.woId = this.localDataService.getWorkOrderId();
    if (this.woId===null || isNaN(+this.woId)) {
      console.log('Invalid Work-Order!');
      this.router.navigate(['/work-order']);
    }

    this.opId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.opId)) {
      console.log('Not a Number!');
      this.router.navigate(['/work-order']);
    }
    else {
      this.dataService.getOperationLogData(Number(this.opId))
        .subscribe(
          data => {
            console.log(data);
            this.opLog = data;
          },
          error => {
            console.log(error);
            if (error.status == 401)            
              this.apiError = 'Un-Authorized !';
            else
              this.apiError = error.error;
            
            this.opLog = {};     
          });
    }
  }

}
