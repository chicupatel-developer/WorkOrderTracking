import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalDataService } from './local-data.service';


import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = 'https://localhost:44359/api';
  public AUTHENTICATE_API = `${this.API}/Authenticate`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};


  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  };


  constructor(
    private http: HttpClient,
    public router: Router,
    private localDataService: LocalDataService
  ) {
  }

  // ok
  // Sign-in
  signin(signinModel): Observable<any> {
    return this.http.post(this.AUTHENTICATE_API + '/login', signinModel)
  } 

  // ok
  getToken() {
    return localStorage.getItem('token');
  }

  // ok
  getMyRole() {
    return localStorage.getItem('myRole');
  }

  // ok
  get isLoggedIn(): boolean {   
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  // ok
  get isAdmin(): boolean {
    let myRole = localStorage.getItem('myRole');
    return (myRole == 'Admin') ? true : false;
  }

  // ok
  doLogout() {
    let removeToken = localStorage.removeItem('token');
    let removeUserName = localStorage.removeItem('userName');
    let removeMyRole = localStorage.removeItem('myRole');

    this.localDataService.setUserName('');
    this.localDataService.setMyRole('');

    if (removeToken == null) {
      this.router.navigate(['/home']);
    }
  }

  // ok
  // register
  register(registerModel): Observable<any> {
    return this.http.post(this.AUTHENTICATE_API + '/register', registerModel)
  }
}
