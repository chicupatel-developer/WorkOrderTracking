import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-part-upload',
  templateUrl: './part-upload.component.html',
  styleUrls: ['./part-upload.component.css']
})
export class PartUploadComponent implements OnInit {

  partId: string;

  apiResponse = '';
  responseColor = '';
  
  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {    
    this.partId = this.route.snapshot.paramMap.get('id');
    if (isNaN(+this.partId)) {
      console.log('Not a Number!');
      this.router.navigate(['/part']);
    }
  }

  public uploadFinished = (event) => {
    console.log('part image upload success!');   
  }  

  cancel() {
    console.log('part image upload cancel!');
    this.router.navigate(['/part']);
  } 
}
