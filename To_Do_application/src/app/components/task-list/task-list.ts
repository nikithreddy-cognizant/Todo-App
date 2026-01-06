import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskI } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})

export class TaskList implements OnInit {
  tasks: TaskI[] = [];
  updateId: string | null = null;
  taskUpdatedValue = new FormControl('');

  constructor(private taskService: TaskService, private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.taskService.setTasks(user.userId!)
        this.taskService.currentTasks$.subscribe((data) => {
          this.tasks = data;
          this.cdr.detectChanges();
        });
      }
    });
  }



  deleteHandler(id: string) {

    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    this.taskService.deleteTask(id).subscribe((data) => {
      this.tasks = this.tasks.filter((task) => task.taskId !== id);
      this.cdr.detectChanges();
      console.log("Task delete", data)
    });
  }

  updateHandler(task: TaskI) {
    this.updateId = task.taskId!;
    this.taskUpdatedValue.setValue(task.task);
  }

  submitHandler(task: TaskI) {
    const updatedTask: TaskI = { ...task, task: this.taskUpdatedValue.value! };
    this.taskService.updateTask(updatedTask).subscribe((data) => {
      this.tasks = this.tasks.map((t) => (t.taskId === updatedTask.taskId ? updatedTask : t));
      this.updateId = null;
      this.cdr.detectChanges();
      console.log("Task Saved", data)
    });
  }

  cancelHandler() {
    this.updateId = null;
  }

  toggleStatus(task: TaskI) {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updatedTask: TaskI = { ...task, status: newStatus };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.tasks = this.tasks.map((t) => (t.taskId === updatedTask.taskId ? updatedTask : t));
      this.updateId = null;
      this.cdr.detectChanges();
    });
  }
}

