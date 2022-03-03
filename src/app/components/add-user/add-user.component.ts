import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Employee';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
 
  first_name!: string;
  last_name!: string;
  email!: string;
  dateOfBirth!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
