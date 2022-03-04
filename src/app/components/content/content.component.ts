import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  employees: Employee[] = [];
  employee: any;
  selectedOption: any;
 
  

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  // addEmployeer(employee: Employee) {
  //   this.employeeService.addEmployee(employee).subscribe(employee => {
  //     this.employees.push(employee);
  //     console.log(employee)
  //   })
  // }

}
