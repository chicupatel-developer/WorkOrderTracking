import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalDataService} from '../services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44359';
  public PART_API = `${this.API}/api/part`;

  constructor(private http: HttpClient, public localDataService: LocalDataService) { }
 
  // part
  getAllParts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.PART_API + '/allParts');
  }
}