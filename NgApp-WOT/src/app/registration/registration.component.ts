import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalDataService } from '../services/local-data.service';
import { UserService } from '../services/user.service';
import Validation from '../services/validation';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    ConfirmPassword: new FormControl(''),
    AppRole: new FormControl(''),
  });
  submitted = false;

  registerModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    appRole: ''
  };

  successRes = false;
  regMessage = '';
  errors: string[];


  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localDataService: LocalDataService,
    public dataService: DataService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        ConfirmPassword: ['', Validators.required],
        AppRole: ['', [Validators.required]]
      },
      {
        validators: [Validation.match('Password', 'ConfirmPassword')]
      }
    );

    if (this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }   
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {

    this.successRes = false;
    this.submitted = true;
    
    this.regMessage = '';
    this.errors = [];

    if (this.form.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
    
    this.registerModel.firstName = this.form.value["FirstName"];
    this.registerModel.lastName = this.form.value["LastName"];
    this.registerModel.appRole = this.form.value["AppRole"];
    this.registerModel.email = this.form.value["Email"];
    this.registerModel.password = this.form.value["Password"];
    this.registerModel.confirmPassword = this.form.value["ConfirmPassword"];

    console.log(this.registerModel);
   
    this.userService.register(this.registerModel).subscribe(
        res => {
          if (res.responseCode == 0) {
            // success       
            this.onReset();

            this.successRes = true;
            this.regMessage = res.responseMessage;

            // redirect to login page
            setTimeout(() => {
              this.router.navigate(['/signin']);
            }, 2000); 
          }
          else {
            // error
            // -1
            this.successRes = false;
            this.regMessage = res.responseMessage;
            this.errors = [];
          }
        },
      err => {
        this.successRes = false;
        console.log(err);   
        // 500
        this.regMessage = err.error.responseMessage;
        this.errors = [];          
        }
      );
  }

  onReset(): void {
    this.successRes = false;
    this.submitted = false;
    this.errors = [];  
    this.regMessage = '';
    this.form.reset();
  }
}
