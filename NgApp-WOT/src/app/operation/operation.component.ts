import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  woId: string;
  ops: Array<any>;

  apiResponse = '';  
  responseColor = '';
  responseClass = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  
  constructor(public localDataService: LocalDataService, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {
    this.loadOps();     
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.loadOps();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadOps();
  }

  loadOps() {
    this.woId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.woId)) {
      console.log('Not a Number!');
      this.router.navigate(['/work-order']);
    }
    else {
      this.dataService.getAllWorkOrderOperations(Number(this.woId))
        .subscribe(
          data => {
            this.ops = data;
            console.log(this.ops);
          },
          error => {
            console.log(error);
            if (error.status == 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
            this.responseClass = 'errorResponse';
            this.ops = [];     
          });
    }
  }

  editOp(op) {
    console.log('editing operation :', op);
  }

  xferParts(op) {
    console.log('xfer parts for operation :', op.operationId);
  }
  
  createOp() {
    this.localDataService.setWorkOrderId(this.woId);
    this.router.navigate(['/operation-create']);
  }

  getOpLog(opId) {
    console.log('getting operation log : ', opId);
  }

  getPartHistory(op) {
    console.log('getting part history for operation : ', op.operationId);
  }

}
