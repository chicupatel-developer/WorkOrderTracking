import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { LocalDataService } from '../services/local-data.service';

import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  form: FormGroup = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  });
  submitted = false;
  signinModel = {
    Email: '',
    Password: ''
  };

  // ok
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localDataService: LocalDataService,
  ) { }

  // ok
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        Email: [
          '',
          [
            Validators.required
          ]
        ],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],      
      },     
    );

    if (this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }   
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    // console.log(JSON.stringify(this.form.value, null, 2));
      var userTokenData = {
        UserName: '',
        Token: '',
        LoginTime: '',
        ResponseCode: 0,
        ResponseMessage: '',       
        MyRole: '',
        FirstName: '',
        LastName: ''
      }
      
      this.signinModel.Email = this.form.value["Email"];
      this.signinModel.Password = this.form.value["Password"];

      console.log(this.signinModel);
    
      this.userService.signin(this.signinModel).subscribe(
        (res: any) => { 
          console.log(res);
          // Success     
          if (res.response.responseCode == 0) {

            //// get role info
            console.log('my role : '+res.myRole);
            let jwtData = res.token.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            console.log('jwtData: ' + jwtData);
            console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
            console.log('decodedJwtData: ' + decodedJwtData);
            //// get role info // end

            userTokenData.Token = res.token;
            userTokenData.ResponseMessage = res.response.responseMessage;
            userTokenData.UserName = res.userName;
            userTokenData.FirstName = res.firstName;
            userTokenData.LastName = res.lastName;

            //// add role info
            userTokenData.MyRole = res.myRole;

            localStorage.setItem('token', userTokenData.Token);
            localStorage.setItem('userName', userTokenData.UserName);
            localStorage.setItem('fullName', userTokenData.FirstName+', '+userTokenData.LastName);
        
            //// store role info
            localStorage.setItem('myRole', userTokenData.MyRole);           

            this.localDataService.setUserName(userTokenData.UserName);
            this.localDataService.setFullName(userTokenData.FirstName+', '+userTokenData.LastName);
            
            //// store role info
            this.localDataService.setMyRole(userTokenData.MyRole);
            
            // redirect to home page
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 5000);
          }
          // error
          else {

            console.log(res.response);

            this.localDataService.setUserName('');
            this.localDataService.setFullName('');
            
            //// reset role
            //// remove role
            this.localDataService.setMyRole('');
          }
        },
        err => {   
          console.log(err);
        }
      );     
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}