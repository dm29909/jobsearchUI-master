import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobService } from 'src/app/services/jobs.service';
import { Jobs } from 'src/app/models/interfaces';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  showJobsTable: boolean = true;
  editingJob = false;
  selectedJob: Jobs | undefined;
  jobs: Jobs[] = [];
  apiUrl = 'assets/jobs.json';
  newJob: Jobs = { id: 0, title: '', company: '', location: '', posted: '', opened: false };
  jobForm: Jobs = {
    id: 0,
    title: '',
    company: '',
    location: '',
    posted: '',
    opened: false
  };
  
  constructor(private jobService: JobService, private http: HttpClient) {}

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      (jobs: Jobs[]) => {
        this.jobs = jobs;
      },
      (error: any) => {
        console.error('Failed to load jobs:', error);
      }
    );
  }

  addJob(newJob: Jobs) {
    this.newJob.opened = false;
    this.newJob.id = this.jobs.length + 1;

    this.jobs.push(newJob);

    this.jobService.saveJobs(this.jobs).subscribe(
      () => {
        console.log('Job added successfully.');
      },
      (error: any) => {
        console.error('Error occurred while saving jobs:', error);
      }
    );
  }

  updateJob() {
    if (this.selectedJob) {
      this.jobService.updateJob(this.selectedJob).subscribe(
        (job: Jobs) => {
          const index = this.jobs.findIndex(j => j.id === job.id);
          if (index !== -1) {
            this.jobs[index] = job;
            this.saveJobs();
          }
          this.selectedJob = undefined;
          this.editingJob = false;
        },
        (error: any) => {
          console.error('Error occurred while updating job:', error);
        }
      );
    }
  }

  editJob(job: Jobs) {
    this.editingJob = true;
    const index = this.jobs.findIndex(j => j.id === job.id);
    if (index !== -1) {
      this.selectedJob = { ...this.jobs[index] };
    }
  }

  cancelJob() {
    this.editingJob = false;
    this.selectedJob = undefined;
  }

  deleteJob(job: Jobs) {
    this.jobService.deleteJob(job).subscribe(
      () => {
        const index = this.jobs.findIndex(j => j.id === job.id);
        if (index !== -1) {
          this.jobs.splice(index, 1);
          this.saveJobs();
        }
      },
      (error: any) => {
        console.error('Error occurred while deleting job:', error);
      }
    );
  }

  saveJobs() {
    this.jobService.saveJobs(this.jobs).subscribe(
      () => {
        console.log('Jobs saved successfully.');
      },
      (error: any) => {
        console.error('Error occurred while saving jobs:', error);
      }
    );
  }
}
