import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { Employee, Report } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class LogsComponent implements OnInit {
  selectedMonth: any;
  employee!: Employee;
  employees: Employee[] = [];
  sick_leave: boolean = false;
  vacation: boolean = false;
  active: boolean = false;
  inactive: boolean = false;
  startOfWork!: string;
  endOfWork!: string;
  break1!: string;
  break2!: string;
  date!: Date;

  reports!: Report[];
  report!: Report;

  selectMonth!: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getReport().subscribe()
    this.employeeService.getEmployee().subscribe(
      (data) => (this.employees = data)
      // .map(e => {
      //   e.sick_leave = true;
      //   e.vacation = false;
      //   e.startOfWork = '8:00';
      //   e.endOfWork = '16:00';
      //   e.break1 = '11:30';
      //   e.break2 = '12:00';

      //   return e;
      // })
    );
  }

  ShowDays() {
    const result = eachDayOfInterval({
      start: startOfMonth(this.selectedMonth),
      end: endOfMonth(this.selectedMonth),
    });
    console.log(result);

    this.employees = this.employees.map((employee: any) => {
      employee.reports = [];
      result.forEach((date) =>
        employee.reports.push({
          employeeID: employee.id,
          date: date,
          sick_leave: (this.vacation = false),
          vacation: (this.vacation = false),
          startOfWork: (this.startOfWork = '7:30'),
          endOfWork: (this.endOfWork = '15:30'),
          break1: (this.break1 = '11:30'),
          break2: (this.break2 = '12:00'),
          active: this.active = true,
         
        })
      );
      return employee;
    });
  }

  saveReport(employees: any) {
    
    let reports:Report[] = [];

    employees.forEach((emp: Employee) => {
      reports = reports.concat(emp.reports)
    })
    console.log(reports)
    const report = {
      month: this.selectedMonth.getMonth(),
      reports: reports
    }
    this.employeeService.saveReport(report).subscribe()
  }
}
