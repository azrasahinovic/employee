import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: string = 'user';

  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole') || '';
  }

}
