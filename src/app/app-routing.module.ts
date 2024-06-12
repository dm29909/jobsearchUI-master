import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/dashboard/users/users/users.component';
import { AdminsComponent } from './components/dashboard/dashboard/admins/admins/admins.component';
import { JobsComponent } from './components/dashboard/dashboard/jobs/jobs.component';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'admin' },
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'jobs', component: JobsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
