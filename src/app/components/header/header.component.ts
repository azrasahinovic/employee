import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role: string = 'user';
  user!: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole') || '';
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['']);
  }

}
