import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementhComponent } from './components/user-managementh/user-managementh.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LogsComponent } from './components/logs/logs.component';
import { AddComponent } from './components/add/add.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CalendarModule } from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import { EditUserComponent } from './components/edit-user/edit-user.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidemenuComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    UserManagementhComponent,
    AdminComponent,
    UserComponent,
    LogsComponent,
    AddComponent,
    OverviewComponent,
    AddUserComponent,
    EditUserComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
   HttpClientModule,
   TableModule,
   DialogModule,
   ConfirmDialogModule,
   BrowserAnimationsModule,
   CalendarModule,
   CheckboxModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
