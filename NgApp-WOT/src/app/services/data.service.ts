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
  public CO_API = `${this.API}/api/customerorder`;

  constructor(private http: HttpClient, public localDataService: LocalDataService) { }
 
  // part
  getAllParts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.PART_API + '/allParts');
  }
  createPart(partModel): Observable<any> {
    return this.http.post(this.PART_API + '/createPart', partModel)
  }
  getPart(selectedPartId: number): Observable<any> {
    return this.http.get<any>(this.PART_API + '/getPart/' + selectedPartId);
  }
  editPart(data): Observable<any> {
    return this.http.post(this.PART_API + '/editPart' , data);
  }
  removePart(data): Observable<any> {
    return this.http.post(this.PART_API + '/removePart' , data);
  }
  partImageUpload(formData) {
    return this.http.post<any>(this.PART_API + '/partImageUpload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

 
  // customer-order
  allCustomerOrders(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.CO_API + '/allCustomerOrders');
  }
  createCustomerOrder(coModel): Observable<any> {
    return this.http.post(this.CO_API + '/createCustomerOrder', coModel)
  }

}