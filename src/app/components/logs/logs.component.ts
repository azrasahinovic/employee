import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class LogsComponent implements OnInit {
  selectedMonth: any;
  employee!: Employee;
  employees: Employee[] = [];
  sick_leave: boolean = false;
  vacation: boolean = false;
  startOfWork!: string;
  endOfWork!: string;
  break1!: string;
  break2!: string;
  date!: Date;

  reports!: Report[];


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(data =>
      this.employees = data
      // .map(e => {
      //   e.sick_leave = true;
      //   e.vacation = false;
      //   e.startOfWork = '8:00';
      //   e.endOfWork = '16:00';
      //   e.break1 = '11:30';
      //   e.break2 = '12:00';

      //   return e;
      // })
    )}

    ShowDays() {
      const result = eachDayOfInterval(
        { 
          start: startOfMonth(this.selectedMonth), 
          end: endOfMonth(this.selectedMonth) 
        }
      )
        console.log(result)

        this.employee = this.employee.map(
          (e: any) => {
            result.forEach(date => 
              this.employee.reports.push(
                {
                  date: this.date,
                  sick_leave: this.sick_leave,
                  vacation: this.vacation,
                  startOfWork: this.startOfWork,
                  endOfWork: this.endOfWork,
                  break1: this.break1,
                  break2: this.break2
                }
          ))
  }
)
       
    }
}



