import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { Role, User } from 'src/app/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  username: string = '';
  password: string = '';
  role!: Role;
  alert: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // login() {

  //   if(this.username && this.password) {

  //   if(this.username === 'user' && this.password === 'user') {
  //     const user: User = {
  //       username: this.username,
  //       password: this.password,
  //       role: Role.User
  //     }

  //     localStorage.setItem('userRole', 'user');
  //     this.router.navigate(['/home'])

  //   }
  //   else if(this.username === 'admin' && this.password === 'admin') {
  //     const user: User = {
  //     username: this.username,
  //     password: this.password,
  //     role: Role.Admin
  //   }
  //     localStorage.setItem('userRole', 'admin')
  //     this.router.navigate(['/home'])
  //   }

  //   else {
  //      console.log('error')
  //     this.messageService.add({severity:'error', summary: 'Error', detail: 'The username or password is incorrect!'});
  //     this.username = '';
  //     this.password = '';
  //   }

  // }

  // }

  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        const user: User = res.find((a: any) => {
          return (
            a.username === this.loginForm.value.username &&
            a.password === this.loginForm.value.password
          );
        });

        if (user) {
          if (this.username === 'admin' && this.password === 'admin') {
            /*  const user: User = {
               username: this.username,
               password: this.password,
               role: Role.Admin,
             }; */
            user.role = Role.Admin;

            localStorage.setItem('userRole', 'admin');
          } else if (this.username !== 'admin' && this.password !== 'admin') {
            user.role = Role.User;
            this.loginForm.reset();
            localStorage.setItem('userRole', 'user');
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);

        } else {
          this.messageService.add({
            severity: 'error',

            detail: 'The username or password is incorrect!',
          });
          this.username = '';
          this.password = '';
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!',
        });
        this.username = '';
        this.password = '';
      }
    );
  }
}
