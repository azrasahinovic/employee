import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  role: string = 'user';

  

  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole') || '';
  }
}
