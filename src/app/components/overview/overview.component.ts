import { Component, OnInit } from '@angular/core';
import { Employee, Report } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  employees: Employee[] = [];
  employee!: Employee;

  reports!: Report[];
  report!: Report;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getReport().subscribe(
      report => this.reports = report
    )
    this.employeeService.getEmployee().subscribe(
      data => this.employees = data)

     
  }

}
