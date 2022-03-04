import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/Employee';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() employee!: Employee;
  @Output() edit: EventEmitter<any> = new EventEmitter();

  first_name!: string;
  last_name!: string;
  email!: string;
  dateOfBirth!: string;

  constructor() { }

  ngOnInit(): void {

  }

  editEmployee(employee: Employee) {
    this.edit.emit(employee);
  }

  

}
