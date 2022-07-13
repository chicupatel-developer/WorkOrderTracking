import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.css']
})
export class PartEditComponent implements OnInit {

  partId: string;

  partForm: FormGroup;
  submitted = false;
  partModel = { 
    partId: 0,
    name: '',
    desc: '',
    qty: 0
  };

  apiResponse = '';
  responseColor = '';
  
  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }

  ngOnInit(): void {
     this.partForm = this.fb.group({
      Name: ['', Validators.required],
      Desc: ['', Validators.required],
      Qty: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
     });
    
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
       
              this.partForm.setValue({
                Name: data.name,
                Desc: data.desc,
                Qty: data.qty
              });
            }
          },
          error => {
            console.log(error);
            /*
            if (error.status == 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
            */
          });
    }
  }

  get partFormControl() {
    return this.partForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.partForm.valid) {
      
      this.partModel.name = this.partForm.value["Name"];
      this.partModel.desc = this.partForm.value["Desc"];
      this.partModel.qty = Number(this.partForm.value["Qty"]);
      this.partModel.partId = Number(this.partId);

      console.log(this.partModel);

      this.dataService.editPart(this.partModel)
        .subscribe(
          response => {

            if (response.responseCode == 0) {
              
              // success
              this.apiResponse = response.responseMessage;
              this.responseColor = 'green';
              this.resetPart();
              this.submitted = false;
              
              setTimeout(() => {
                this.apiResponse = ''; 
                this.router.navigate(['/part']);
              }, 2000);  
            }
            else {
              // -1
              // server error
              this.apiResponse = response.responseCode + ' : ' + response.responseMessage;
              this.responseColor = 'red';
            }
          },
          error => {
            console.log(error);

            if (error.status == 401)            
              this.apiResponse = 'Un-Authorized !';
            else
              this.apiResponse = 'Error !';
            
            this.responseColor = 'red';
          }
        );
    }
  }
  
  resetPart(){
    this.partForm.reset();
    this.submitted = false;
  }

  checkForNumbersOnly(newVal) {
    /*
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal))
      console.log('ok');
    else
      console.log('Only Numbers Allowed !!!');
    */
  }
}
