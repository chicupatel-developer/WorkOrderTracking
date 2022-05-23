import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalDataService} from '../services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44354';
  public DEPARTMENT_API = `${this.API}/api/department`;

  constructor(private http: HttpClient, public localDataService: LocalDataService) { }
 
}