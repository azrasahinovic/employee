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
  ElementRef,
  ViewChild,
} from '@angular/core';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { Employee, Report } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ExcelService } from 'src/app/services/excel.service';
import { format } from 'date-fns';

export interface IRow {
  field1: any;
  field2: any;
  field3: any;
  field4: any;
  field5: any;
  field6: any;
  field7: any;
  field8: any;
  field9: any;
  field10: any;
  field11: any;
  field12: any;
  field13: any;
  field14: any;
  field15: any;
}

const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  month: Date = new Date();

  reports!: Report[];
  report!: Report;

  selectMonth!: Employee;

  @ViewChild('htmlData', {static:false}) htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  fileName = "ExcelSheet.xlsx"

  @ViewChild('userTable') userTable!: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private excelService: ExcelService
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
          active: (this.active = true),
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
//excel
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.fileName); 

    console.log('downloading...');
  }

}
