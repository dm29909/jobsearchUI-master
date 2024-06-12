import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/dashboard/users/users/users.component';
import { AdminsComponent } from './components/dashboard/dashboard/admins/admins/admins.component';
import { JobsComponent } from './components/dashboard/dashboard/jobs/jobs.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [AppComponent,  LoginComponent, DashboardComponent, UsersComponent, AdminsComponent, JobsComponent],
  imports: [BrowserModule,HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
