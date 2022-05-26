import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-part-remove',
  templateUrl: './part-remove.component.html',
  styleUrls: ['./part-remove.component.css']
})
export class PartRemoveComponent implements OnInit {

  partFilePath = "https://localhost:44359/PartFiles/";  
  
  partId: string;
  part: any;
  
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
    else {
      this.dataService.getPart(Number(this.partId))
        .subscribe(
          data => {
            if(data==null){
              console.log('part not found!');
           
              this.apiResponse = 'Part Not Found!';
              this.responseColor = 'red';
            }
            else{
              this.apiResponse = '';
              this.responseColor = 'green';   
                         
              this.part = data;  
              if(this.part.partFile!=null)
                this.part.partFile = this.partFilePath + ''+this.part.partFile;
            }
          },
          error => {
            console.log(error);
            
            if (error.status == 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          });
    }
  }

}
