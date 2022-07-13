import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataService } from '../services/local-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-operator-log',
  templateUrl: './view-operator-log.component.html',
  styleUrls: ['./view-operator-log.component.css']
})
export class ViewOperatorLogComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router,
    public localDataService: LocalDataService,) { }

  ngOnInit(): void {
    /*
    if (!(this.userService.isLoggedIn && !this.userService.isAdmin)) {
      this.router.navigate(['/home']);
    }   
    */
  }

}
