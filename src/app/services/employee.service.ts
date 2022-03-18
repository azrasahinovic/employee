import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { Employee, MonthReport, Report } from '../Employee';

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
  private apiUrlSignUp = 'http://localhost:3000/signupUsers';

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

  getReport(employeeID?: any, selectedMonth?: any): Observable<any> {
    return this.http.get<any>(this.apiUrlReports + `?month=${selectedMonth}`)
    .pipe(
      map(el => {
        let reports = [];
        if (el.length > 0) {
          reports = el[0].reports.filter((report: any) => report.employeeID === employeeID)
        }
        return reports;
      })
    );
  }

  getReports(selectedMonth: any): Observable<MonthReport[]> {
    return this.http.get<MonthReport[]>(this.apiUrlReports + `?month=${selectedMonth}`)
  }

  saveReport(report: any): Observable<Report[]> {
    const urlReports = `${this.apiUrlReports}`;
    return this.http.post<any>(urlReports, report, httpOptions);
  }

  
  
}
