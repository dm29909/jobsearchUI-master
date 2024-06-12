import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from '../models/interfaces';
import { User } from '../models/interfaces';
import { Jobs } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private apiUrl = 'http://example.com/api/admins';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, null);
  }

  registerAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/register/admin`, admin);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register/user`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  addJob(job: Jobs): Observable<Jobs> {
    return this.http.post<Jobs>(`${this.apiUrl}/jobs`, job);
  }

  updateJob(updatedJob: Jobs): Observable<Jobs | null> {
    const url = `${this.apiUrl}/jobs/${updatedJob.id}`;

    return this.http.put<Jobs>(url, updatedJob).pipe(
      catchError(() => {
        // Handle errors here
        return of(null);
      })
    );
  }

  // Implement the following methods:

  editAdmin(selectedAdmin: Admin): Observable<Admin | null> {
    const url = `${this.apiUrl}/admins/${selectedAdmin.id}`;

    return this.http.put<Admin>(url, selectedAdmin).pipe(
      catchError(() => {
        // Handle errors here
        return of(null);
      })
    );
  }

  deleteAdmin(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/admins/${id}`;

    return this.http.delete<boolean>(url);
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admins`);
  }

  getAdmins(): Observable<Admin[]> {
    // You can implement this method based on your requirements
    // For example, you can return a filtered list of admins or apply any necessary transformations
    // This is just a placeholder implementation
    return this.getAllAdmins();
  }
}
