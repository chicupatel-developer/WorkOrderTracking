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
  public WO_API = `${this.API}/api/workorder`;
  public OP_API = `${this.API}/api/operation`;
  public OPR_LOG_API = `${this.API}/api/operatorlog`;

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
  getCustomerOrder(selectedCoId: number): Observable<any> {
    return this.http.get<any>(this.CO_API + '/getCustomerOrder/' + selectedCoId);
  }
  editCustomerOrder(data): Observable<any> {
    return this.http.post(this.CO_API + '/editCustomerOrder' , data);
  }
  removeCustomerOrder(data): Observable<any> {
    return this.http.post(this.CO_API + '/removeCustomerOrder' , data);
  }
  getCustomerOrderProgressTextReport(selectedCoId: number): Observable<any> {
    return this.http.get<any>(this.CO_API + '/getCustomerOrderProgressTextReport/' + selectedCoId);
  }
  getCustomerOrderProgressChartReport(selectedCoId: number): Observable<any> {
    return this.http.get<any>(this.CO_API + '/getCustomerOrderProgressChartReport/' + selectedCoId);
  }

  // work-order
  allWorkOrders(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.WO_API + '/allWorkOrders');
  }
  getCustomerOrderDetails(selectedCoId: number): Observable<any> {
    return this.http.get<any>(this.WO_API + '/getCustomerOrderDetails/' + selectedCoId);
  }
  getCustomerOrders(): Observable<any> {
    return this.http.get<any>(this.WO_API + '/getCustomerOrders');
  }
  createWorkOrder(woModel): Observable<any> {
    return this.http.post(this.WO_API + '/createWorkOrder', woModel)
  }
  editWorkOrder(data): Observable<any> {
    return this.http.post(this.WO_API + '/editWorkOrder' , data);
  }
  getWorkOrder(selectedWoId: number): Observable<any> {
    return this.http.get<any>(this.WO_API + '/getWorkOrder/' + selectedWoId);
  }
  removeWorkOrder(data): Observable<any> {
    return this.http.post(this.WO_API + '/removeWorkOrder' , data);
  }

  // operation
  getAllWorkOrderOperations(selectedWoId: number): Observable<any> {
    return this.http.get<any>(this.OP_API + '/getAllWorkOrderOperations/' + selectedWoId);
  }
  createOperation(opModel): Observable<any> {
    return this.http.post(this.OP_API + '/createOperation', opModel)
  }
  editOperation(data): Observable<any> {
    return this.http.post(this.OP_API + '/editOperation' , data);
  }
  getOperation(selectedOpId: number): Observable<any> {
    return this.http.get<any>(this.OP_API + '/getOperation/' + selectedOpId);
  }

  // xfer parts
  getPartList(): Observable<any> {
    return this.http.get<any>(this.OP_API + '/getPartList');
  }
  getOperationDetails(selectedOpId: number): Observable<any> {
    return this.http.get<any>(this.OP_API + '/getOperationDetails/' + selectedOpId);
  }
  xferPartsForOperation(data): Observable<any> {
    return this.http.post(this.OP_API + '/xferPartsForOperation' , data);
  }

  getPartHistory(selectedOpId: number): Observable<any> {
    return this.http.get<any>(this.OP_API + '/getPartHistory/' + selectedOpId);
  }

  getOperationLogData(selectedOpId: number): Observable<any> {
    return this.http.get<any>(this.OP_API + '/getOperationLogData/' + selectedOpId);
  }

  // operator-log-create
  getWorkOrderList(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.OPR_LOG_API + '/getWorkOrderList');
  }
  getOperationList(selectedWoId: number): Observable<any> {
    return this.http.get<any>(this.OPR_LOG_API + '/getOperationList/' + selectedWoId);
  }
  getOperationQtyData(selectedOpId: number): Observable<any> {
    return this.http.get<any>(this.OPR_LOG_API + '/getOperationQtyData/' + selectedOpId);
  }
  createOperatorLog(data): Observable<any> {
    return this.http.post(this.OPR_LOG_API + '/createOperatorLog' , data);
  }
  
  getMyLogData(data): Observable<any> {
    return this.http.post(this.OPR_LOG_API + '/getMyLogData' , data);
  }
  
}