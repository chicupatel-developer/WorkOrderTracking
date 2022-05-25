import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-part-create',
  templateUrl: './part-create.component.html',
  styleUrls: ['./part-create.component.css']
})
export class PartCreateComponent implements OnInit {

  partForm: FormGroup;
  submitted = false;
  partModel = {
    name: '',
    desc: '',
    qty: 0
  };

  apiResponse = '';  
  responseColor = '';

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.partForm = this.fb.group({
      Name: ['', Validators.required],
      Desc: ['', Validators.required],
      Qty: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
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

      this.dataService.createPart(this.partModel)
        .subscribe(
          response => {
            console.log(response);

            if(response.responseCode==0){
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
            else{
              // -1
              // server error
              this.apiResponse = response.responseCode + ' : ' + response.responseMessage;
              this.responseColor = 'red';
            }
          },
          error => {
            console.log(error);
            this.apiResponse = error;
            this.responseColor = 'red';
          }
        );
    }
  } 

  resetPart() {    
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
