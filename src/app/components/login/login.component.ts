import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

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
  alert: boolean = false;

  constructor(private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { }

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

    else {
       console.log('error')
      this.messageService.add({severity:'error', summary: 'Error', detail: 'The username or password is incorrect!'});
      this.username = '';
      this.password = '';
    }
    
  }
  
  }
}





