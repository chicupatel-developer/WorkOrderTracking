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
  
  constructor(public localDataService: LocalDataService, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {
   
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
          });
    }
  }

}
