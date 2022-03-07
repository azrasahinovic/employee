import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { UserManagementhComponent } from './components/user-managementh/user-managementh.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent,
  children: [
    {path: 'um', component: UserManagementhComponent, canActivate: [AuthGuard], data: ['admin']},
    {path: 'logs', component: LogsComponent,canActivate: [AuthGuard], data: ['admin']}
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
