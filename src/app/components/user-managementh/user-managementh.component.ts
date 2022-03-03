import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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

  @Output() onAddEmployee: EventEmitter<any> = new EventEmitter();

  display: boolean = false;

  constructor(private employeeService: EmployeeService,
   ) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(data =>
      this.employees = data);
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  onSubmit() {
    const employee = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      dateOfBirth: this.dateOfBirth
    }
    this.onAddEmployee.emit(employee);
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee).subscribe(
      (employees) => {
        const index = this.employees.findIndex((el) => el.id === employee.id);
        if(index > -1) {
          this.employees.splice(index, 1);
        }
      }
    )
  }

}
