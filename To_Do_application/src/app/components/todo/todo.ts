import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { TaskI } from '../../models/task';
import { UserI } from '../../models/user';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { noWhitespaceValidator } from '../../shared/validators/noWhitespaceValidator';

@Component({
  selector: 'app-todo',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  userData: UserI | null = null;
  message: null | { title: string; success: boolean } = null;


  constructor(private taskService: TaskService, private authService: AuthService,private cdr: ChangeDetectorRef) {}

  TaskForm = new FormGroup({
    task: new FormControl<string>('', { nonNullable: true, validators: [Validators.required,noWhitespaceValidator] }),
  });

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.userData = user;
      console.log(this.userData, "user at todo")
    });
  }

  submitHandler() {

    if (this.TaskForm.invalid) {
      this.TaskForm.markAllAsTouched();
      return;
    }

    if (this.userData && this.userData?.userId) {
      const newTask: TaskI = { userId: this.userData.userId, ...this.TaskForm.value} as TaskI;
      console.log('new todo', newTask);

      this.taskService.addTask(newTask).subscribe({
        next: (data) => {
          this.message = {title:"Task added successfully!",success:true};
          this.cdr.detectChanges();
          console.log('Task posted', data);
        },
        error: (err) => {
          console.error('Error posting task', err);
          this.message = {title:"Failed to add task!",success:true};
          this.cdr.detectChanges();
          
        },
      });

      this.TaskForm.reset({ task: '' });
    
    }
  }

  clearMessage() {
  this.message = null;
}

}
