import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  msgs1!: Message[];
  public signupForm !: FormGroup;


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
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    .subscribe(
      res => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Signup Successfull!'});
        this.signupForm.reset();
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
        
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong!'});
      }
    )

  }

}
