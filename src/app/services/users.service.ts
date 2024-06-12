// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4200'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
