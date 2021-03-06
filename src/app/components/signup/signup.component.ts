import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { User } from 'src/app/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  username: string = '';
  email: string = '';

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      username: [''],
      password: ['']
    })
  }

  signUp() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        const user: User = res.find((a: any) => {
          return (a.username === this.signupForm.value.username || a.email === this.signupForm.value.email)
        });
        if (user) {
          this.messageService.add({ severity: 'info', detail: 'The email or username already exist!' });
          this.signupForm.reset();
        } else {
          this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
            .subscribe(
              res => {
                this.messageService.add({ severity: 'success', detail: 'Signup Successfull!' });
                this.signupForm.reset();
                setTimeout(() => {
                  this.router.navigate(['login']);
                }, 2000);

              },
              error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!' });
              }
            );
        }
      }
    )
  }
}
