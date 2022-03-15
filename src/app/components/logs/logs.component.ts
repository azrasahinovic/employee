import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  OnInit,
} from '@angular/core';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { Employee, Report } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';




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
  
  

  month: Date = new Date();

  reports!: Report[];
  report!: Report;

  selectMonth!: Employee;

  fileName = "ExcelSheet.xlsx"

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
   
  ) { }

  ngOnInit(): void {
    this.employeeService.getReport().subscribe(
      reports => this.reports = reports
    );
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
          break2: endBreak,
          active: true,
        })
      );
      return employee;
    });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
    });
  }
  
  onConfirm(employees: any) {
    let reports: Report[] = [];

    employees.forEach((emp: Employee) => {
      reports = reports.concat(emp.reports);
    });
    console.log(reports);
    const report = {
      month: this.selectedMonth.getMonth(),
      reports: reports,
    };
    this.employeeService.saveReport(report).subscribe();
  }

  onReject() {
    this.messageService.clear('c');
  }

  public download() {
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.fileName); 
    console.log('downloading...');
  }

}
