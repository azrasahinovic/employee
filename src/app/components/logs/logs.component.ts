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
  ViewChild,
} from '@angular/core';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { Employee, Report } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Table } from 'primeng/table';

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
  @ViewChild('dt') table!: Table;
  activityValues: number[] = [0, 100];
  fileName = "ExcelSheet.xlsx";


  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.selectedMonth = new Date();
    this.employeeService.getEmployee().subscribe(
      (data) => {
        (this.employees = data);
        this.getReports();
      }
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

  getReports() {
    this.employeeService.getReports(this.selectedMonth.getMonth()).subscribe(
      res => {
        const employees: Employee[] = [];
        if (res.length > 0) {
          res[0].reports?.forEach(report => {
            if (employees.some(el => el.id === report.employeeID)) {
              const temp = employees.find(el => el.id === report.employeeID);
              temp?.reports.push(this.formatEmployee(report));
            } else {
              const temp = {
                id: report.employeeID, reports: [
                  this.formatEmployee(report)
                ]
              };
              employees.push(temp);
            }
          })
          this.employees.forEach(emp => emp.reports = employees.find(el => el.id === emp.id)?.reports || [])
        } else {
          this.generateReport();
        }
      }

    )
  }

  formatEmployee(report: any): Report {
    return {
      employeeID: report.employeeID,
      vacation: report.vacation,
      date: new Date(report.date),
      sick_leave: report.sick_leave,
      startOfWork: new Date(report.startOfWork),
      endOfWork: new Date(report.endOfWork),
      break1: new Date(report.break1),
      break2: new Date(report.break2)
    }
  }

  ShowDays() {
    this.getReports();
  }

  generateReport() {
    const result = eachDayOfInterval({
      start: startOfMonth(this.selectedMonth),
      end: endOfMonth(this.selectedMonth),
    });

    this.employees = this.employees.map((employee: any) => {
      employee.reports = [];
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
          sick_leave: false,
          vacation: false,
          startOfWork: startWork,
          endOfWork: endWork,
          break1: startBreak,
          break2: endBreak
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
