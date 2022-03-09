import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, Report } from '../Employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  private apiUrlReports = 'http://localhost:3000/reports';

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<Employee>(this.apiUrl, employee, httpOptions);
  }

  deleteEmployee(employee: Employee): Observable<any> {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.delete<Employee>(url);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee, httpOptions);
  }

  getReport(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrlReports);
  }

  saveReport(report: any): Observable<Report[]> {
    const urlReports = `${this.apiUrlReports}/month/${report.month}`;
    return this.http.post<any>(urlReports, report, httpOptions);
  }
  
}
