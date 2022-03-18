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
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  employees: Employee[] = [];
  employee!: Employee;

  reports!: Report[];
  report!: Report;
  user!: User;

  selectedMonth: any;
  employeeID: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.employeeService.getReport().subscribe(
      reports => this.reports = reports
    )
    this.employeeService.getEmployee().subscribe(
      data => this.employees = data)

  }

  ShowDays() {
    const result = eachDayOfInterval({
      start: startOfMonth(this.selectedMonth),
      end: endOfMonth(this.selectedMonth),
    });

    this.employees = this.employees.map((employee: any) => {
      employee.reports = [];
      console.log(employee);
      
      const startWork = new Date();
      startWork.setHours(7);
      startWork.setMinutes(30)

      const endWork = new Date();
      endWork.setHours(15)
      endWork.setMinutes(30)

      const startBreak = new Date();
      startBreak.setHours(11)
      startBreak.setMinutes(30)

      const endBreak = new Date();
      endBreak.setHours(12)
      endBreak.setMinutes(0)

     
      
      result.forEach((date) =>
        employee.reports.push({
          employeeID: employee.id,
          date: date,
          sick_leave:  false,
          vacation: false,
          startOfWork: startWork,
          endOfWork: endWork,
          break1:  startBreak,
          break2: endBreak
        })
      );
      return employee;
    });

    
  }


}
