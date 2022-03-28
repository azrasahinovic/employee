import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-user-managementh',
  templateUrl: './user-managementh.component.html',
  styleUrls: ['./user-managementh.component.scss']
})
export class UserManagementhComponent implements OnInit {
  employees: Employee[] = [];

  first_name!: string;
  last_name!: string;
  email!: string;
  dateOfBirth!: string;
  @Input() employee!: Employee;
  @Input() selectedOption: any;

  display: boolean = false;
  open: boolean = false;
  selected!: Employee;

  constructor(private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(data =>
      this.employees = data);
  }

  showDialog() {
    this.display = true;
  }

  showEditDialog(employee: any) {
    this.open = true;
    this.selected = employee;
  }

  closeDialog() {
    this.display = false;
  }

  addEmployeer(employee: Employee) {
    this.employeeService.addEmployee(employee).subscribe(employee => {
      this.employees.push(employee);
      console.log(employee)
    })
    this.display = false;
  }

  editEmployee(employee: Employee) {
    this.employeeService.editEmployee(employee).subscribe(
      employee => {
        this.employee = employee;
        console.log(employee)
      }
    )
    this.open = false;
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee).subscribe(
      (employees) => {
        const index = this.employees.findIndex((el) => el.id === employee.id);
        if (index > -1) {
          this.employees.splice(index, 1);
        }
      }
    )
  }
}
