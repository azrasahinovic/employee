import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Role, User } from 'src/app/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  role!: Role;

  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    if(this.username && this.password) {
      
      
    if(this.username === 'user' && this.password === 'user') {
      const user: User = {
        username: this.username,
        password: this.password,
        role: Role.User
      }
      localStorage.setItem('userRole', 'user');
      this.router.navigate(['/home'])
      
    }
    else if(this.username === 'admin' && this.password === 'admin') {
      const user: User = {
      username: this.username,
      password: this.password,
      role: Role.Admin
    }
      localStorage.setItem('userRole', 'admin')
      this.router.navigate(['/home'])
    }
    
  }
  }
}





