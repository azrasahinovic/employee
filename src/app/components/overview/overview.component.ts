import { Component, OnInit } from '@angular/core';
import { Employee, Report } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { User } from 'src/app/User';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  employees: Employee[] = [];
  employee!: Employee | undefined;

  reports!: Report[];
  report!: Report;
  user!: User;

  selectedMonth: any;
  employeeID: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.selectedMonth = new Date();

    this.employeeService.getEmployee().subscribe((data) => {
      this.employee = data.find((a: any) => a.email === this.user.email);
      this.getReport();
    });
  }

  getReport() {
    if (this.employee) {
      this.employeeService
        .getReport(this.employee.id, this.selectedMonth.getMonth())
        .subscribe((reports) => {
          this.reports = reports.map((el: Report) => {
            return {
              date: new Date(el.date),
              sick_leave: el.sick_leave,
              startOfWork: new Date(el.startOfWork),
              endOfWork: new Date(el.endOfWork),
              break1: new Date(el.break1),
              break2: new Date(el.break2)

            };
          });
        });
    }
  }

  ShowDays() {
    this.getReport();
  }
}
