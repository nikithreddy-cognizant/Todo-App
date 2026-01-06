
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UserI } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskService } from './task-service';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  // BehaviorSubject to hold current user state
  private currentUserSubject = new BehaviorSubject<UserI | null>(null);
  // expose as observable
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private t: TaskService) { }

  // Register new user
  postUserData(userData: UserI): Observable<UserI> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<UserI>(url, userData);
  }

  // Login user
  loginUser(userData: { email: string; password: string }): Observable<ApiResponse<UserI>> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<ApiResponse<UserI>>(url, userData, { withCredentials: true })
  }

  setUser(user: UserI): void {
    this.currentUserSubject.next(user);
  }


  get currentUserValue(): UserI | null {
    return this.currentUserSubject.value;
  }


  // Logout user
  logout(): Observable<ApiResponse<UserI>> {
    const url = `${this.baseUrl}/auth/logout`;
    this.currentUserSubject.next(null);
    return this.http.post<ApiResponse<UserI>>(url,{},{withCredentials: true})
    
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
