import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  role: string = 'user';
  selectedOption: any;
  

  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole') || '';
  }

  selOption(event: any) {
    this.selectedOption = event; 
    console.log('welcome') 
  }

 
}
