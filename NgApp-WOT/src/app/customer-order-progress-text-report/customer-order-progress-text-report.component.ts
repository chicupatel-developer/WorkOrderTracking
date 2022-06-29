import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-customer-order-progress-text-report',
  templateUrl: './customer-order-progress-text-report.component.html',
  styleUrls: ['./customer-order-progress-text-report.component.css']
})
export class CustomerOrderProgressTextReportComponent implements OnInit {

  coId: string;
  
  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {       
    this.coId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.coId)) {
      console.log('Not a Number!');
      this.router.navigate(['/customer-order']);
    }
    else {
      this.dataService.getCustomerOrderProgressTextReport(Number(this.coId))
       .then((response) => {
        console.log(response);

      })
      .catch((e) => {
        console.log(e);    
      });
    }
  }

}
