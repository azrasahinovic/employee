import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  employees!: Employee[];
 
  first_name!: string;
  last_name!: string;
  email!: string;
  dateOfBirth!: string;

  @Output() onAddEmployee: EventEmitter<any> = new EventEmitter();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const employee = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      dateOfBirth: this.dateOfBirth
    }
    this.onAddEmployee.emit(employee);

    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.dateOfBirth = '';
  }

}


