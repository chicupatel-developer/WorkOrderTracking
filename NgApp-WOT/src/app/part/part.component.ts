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
            if(part.partFile!="N/A")
              part.partFilePath = this.partFilePath+''+part.partFile;
          });


          this.parts = data;
          this.responseColor = 'green';
          this.apiResponse = 'Success!';
          this.responseClass = 'successResponse';

          console.log(this.parts);
        },
        error => {
          console.log(error);
          if (error.status == 401)            
            this.apiResponse = 'Un-Authorized !';
          else
            this.apiResponse = 'Error !';
          
          this.responseColor = 'red';
          this.responseClass = 'errorResponse';
          this.parts = [];      
      });
  }

  editPart(part) {
    this.router.navigate(['/part-edit/'+ part.partId]);
  }

  removePart(part) {
    this.router.navigate(['/part-remove/'+ part.partId]);
  }

  createPart() {
    setTimeout(() => {
      this.router.navigate(['/part-create']);
    }, 500);
  }

  uploadPart(part) {
    this.router.navigate(['/part-upload/'+ part.partId]);
  }

  noImage() {
    console.log('No Image !!!');
  }
}
