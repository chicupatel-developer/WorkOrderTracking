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

  partFilePath = "https://localhost:44359/PartFiles/";
  
  parts: Array<any>;

  apiResponse = '';  
  responseColor = '';
  responseClass = '';

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
     this.loadParts();  
  }

  loadParts(){
    this.dataService.getAllParts()
      .subscribe(
        data => {          
          console.log(data);

          data.map((part, i) => {
            part.partFilePath = this.partFilePath+''+part.partFile;
          });


          this.parts = data;
          this.responseColor = 'green';
          this.apiResponse = 'Success!';
          this.responseClass = 'successResponse';

          console.log(this.parts);
        },
        error => {
          console.log(error.error);
          this.responseColor = 'red';
          this.apiResponse = error.error;
          this.responseClass = 'errorResponse';
          this.parts = [];
      });
  }

  editPart(part) {
    console.log(part);
  }

  removePart(part) {
    console.log(part);
  }

  createPart() {
    // redirect to part-create
    setTimeout(() => {
      this.router.navigate(['/part-create']);
    }, 500);
  }

}
