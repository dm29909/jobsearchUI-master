import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/jobs.service';
import { Jobs } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  jobsData!: Observable<Jobs[]>;

  constructor(
    private router: Router,
    private jobsService: JobService,
    private authService: AuthService // Inject the AuthService or relevant service
  ) {}

  showUsersTable = false;
  showAdminsTable = false;
  showJobsTable = false;
  isAdmin = false; // Initialize the isAdmin variable

  showUsers() {
    this.showUsersTable = true;
    this.showAdminsTable = false;
    this.showJobsTable = false;
  }

  showAdmins() {
    this.showUsersTable = false;
    this.showAdminsTable = true;
    this.showJobsTable = false;
  }

  showJobs() {
    this.showUsersTable = false;
    this.showAdminsTable = false;
    this.showJobsTable = true;
  }

  loggedInUserName: string | null = null;

  ngOnInit(): void {
    this.loadJobsData();
    this.loggedInUserName = localStorage.getItem('loggedInUserName');
    this.jobsData = this.jobsService.getJobs();

    this.checkUserRole(); // Check the user role when the component initializes
  }

  onLogout() {
    localStorage.removeItem('loggedInUserName');
    this.router.navigate(['/login']);
  }

  private loadJobsData() {
    const savedJobsData = localStorage.getItem('jobsData');
    if (savedJobsData) {
      this.jobsData = JSON.parse(savedJobsData);
    } else {
      this.jobsData = this.jobsService.getJobs();
      this.saveJobsData();
    }
  }

  private saveJobsData() {
    localStorage.setItem('jobsData', JSON.stringify(this.jobsData));
  }

  private checkUserRole() {
    const userRole = this.authService.getUserRole();
    this.isAdmin = (userRole === 'admin');
  }
  
}
