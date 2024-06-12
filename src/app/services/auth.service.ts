import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://example.com/api/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, null);
  }
  getUserRole(): string {
    // Retrieve the user's role from your authentication mechanism
    // This can be from a token, local storage, or any other method
    // Return the user's role
    return 'admin'; // Replace this with your actual role retrieval logic
  }
}
