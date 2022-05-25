import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {

  parts: Array<any>;

  apiResponse = '';  
  responseColor = '';

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
     this.loadParts();  
  }

  loadParts(){
    this.dataService.getAllParts()
      .subscribe(
        data => {          
          console.log(data);
          this.parts = data;
          this.responseColor = 'green';
          this.apiResponse = 'Success!';
        },
        error => {
          console.log(error.error);
          this.responseColor = 'red';
          this.apiResponse = error.error;
          this.parts = [];
      });
  }

  editPart(part) {
    console.log(part);
  }

  removePart(part) {
    console.log(part);
  }

}
