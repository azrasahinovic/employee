import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  display: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selected() {
    this.select.emit();
    console.log('hi')
  }

 
}
