import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../models/task';
import { environment } from '../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

   // BehaviorSubject to hold current user state
    private currentUserTasks = new BehaviorSubject<TaskI[]>([]);
    // expose as observable
    currentTasks$ = this.currentUserTasks.asObservable(); 

  private baseUrl = environment.tasksUrl;
  url = `${this.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  addTask(task: TaskI) {
    return this.http.post<ApiResponse<TaskI>>(this.url, task, { withCredentials: true });
  }

  getTasksByUserId(userId: string){
    return this.http.get<ApiResponse<TaskI[]>>(`${this.url}/user/${userId}`, { withCredentials: true });
  }

  deleteTask(id: string) {
    return this.http.delete<ApiResponse<TaskI>>(`${this.url}/${id}`, { withCredentials: true });
  }

  updateTask(task: TaskI) {
    return this.http.put<ApiResponse<TaskI>>(`${this.url}/${task.taskId}`, task, { withCredentials: true });
  }

  setTasks(userId: string): void { 
    this.getTasksByUserId(userId).subscribe((response) => 
    { this.currentUserTasks.next(response.data!); }); }
}
