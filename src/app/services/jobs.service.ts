import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jobs } from '../models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = `${environment.apiBaseUrl}/jobs`; // Update the API URL based on your backend routes

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(this.apiUrl);
  }

  saveJobs(jobs: Jobs[]): Observable<void> {
    const jsonData = JSON.stringify(jobs);
    return this.http.put<void>(this.apiUrl, jsonData);
  }

  addJob(job: Jobs): Observable<Jobs> {
    return this.http.post<Jobs>(this.apiUrl, job);
  }

  updateJob(job: Jobs): Observable<Jobs> {
    const url = `${this.apiUrl}/${job.id}`;
    return this.http.put<Jobs>(url, job);
  }

  deleteJob(job: Jobs): Observable<void> {
    const url = `${this.apiUrl}/${job.id}`;
    return this.http.delete<void>(url);
  }
}
