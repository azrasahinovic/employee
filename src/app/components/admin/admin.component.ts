import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  display: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }
  
 
}
