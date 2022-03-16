import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserManagementhComponent } from './components/user-managementh/user-managementh.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', component: HomeComponent,
  children: [
    {path: 'um', component: UserManagementhComponent, canActivate: [AuthGuard], data: ['admin']},
    {path: 'logs', component: LogsComponent,canActivate: [AuthGuard], data: ['admin']},
    {path: 'overview', component: OverviewComponent}
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
