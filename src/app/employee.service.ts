import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/v1/employees';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    let list = [{
      "id": 1,
      "firstName" : "Devaraj",
      "lastName" : "Prathan",
      "emailId" : "deva@aricent.com",
      "active" : false
  }];
  let subject = new Subject<any>();
  setTimeout(function(){
    subject.next(list);
  },1000)
  return subject;
    //return this.http.get(`${this.baseUrl}`);
  }
}