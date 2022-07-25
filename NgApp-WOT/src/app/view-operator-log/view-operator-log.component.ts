import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataService } from '../services/local-data.service';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-view-operator-log',
  templateUrl: './view-operator-log.component.html',
  styleUrls: ['./view-operator-log.component.css']
})
export class ViewOperatorLogComponent implements OnInit {

  logData: Array<any>;

  viewMyLogDataEnumCollection: Array<any>;

  oprLogForm: FormGroup;
  submitted = false;
  oprLogModel = {
    logDataRange: 0,  
    userId: '',
  };
  
  apiResponse = '';  
  apiError = false;
  
  constructor(private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private fb: FormBuilder,) { }
  
  ngOnInit(): void {
    this.oprLogForm = this.fb.group({
      ViewMyLogData: ['', Validators.required],  
    });  
    this.viewMyLogDataEnumCollection = this.localDataService.getViewMyLogDataEnumValues();
  }

  get oprLogFormControl() {
    return this.oprLogForm.controls;
  }
  
  onSubmit(): void {

    this.apiResponse = '';
    this.apiError = false;
    this.logData = [];

    this.submitted = true;
    
    if (this.oprLogForm.valid) {      

      this.oprLogModel.logDataRange = this.oprLogForm.value["ViewMyLogData"]; 
      this.oprLogModel.userId = this.localDataService.getMyUserId();

      console.log(this.oprLogModel);
      
      this.dataService.getMyLogData(this.oprLogModel)
        .subscribe(
          response => {
            console.log(response);

            if(response.response.responseCode===0){
              // success    
              this.apiResponse = response.response.responseMessage;
              this.apiError = false;
              this.logData = response.logData;
            }
            else{
              // -1
              // server error
              this.apiResponse = response.response.responseCode + ' : ' + response.response.responseMessage;
              this.apiError = true;
              this.logData = [];
            }
          },
          error => {
            this.apiResponse = "Error !";
            this.apiError = true;
            this.logData = [];
          }
        );
    }
    else {
      console.log('form in-valid!');
    }    
  } 
}
