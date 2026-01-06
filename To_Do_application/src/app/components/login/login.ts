
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../models/ApiResponse';
import { UserI } from '../../models/user';
import { TaskService } from '../../services/task-service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
 message: null | { title: string; success: boolean } = null;

  constructor(private authService: AuthService, private router: Router,private taskService:TaskService,private cdr: ChangeDetectorRef) {}

  LoginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });

  loginUser: ApiResponse<UserI> | null = null;

  submitHandler() {
    if (this.LoginForm.invalid) {
    this.LoginForm.markAllAsTouched();
      return;
    }
    this.authService
      .loginUser(this.LoginForm.value as { email: string; password: string })
      .subscribe((data) => {
        this.loginUser = data;
        if (data.success) {
          this.authService.setUser(this.loginUser.data!);
          this.taskService.setTasks(this.loginUser.data?.userId!)
          this.message ={ title: this.loginUser.message, success: true };
          this.cdr.detectChanges();
          setTimeout(() => { this.router.navigate(['/addTask']);}, 1000);
          this.LoginForm.reset();
        } else {
          this.message ={ title: this.loginUser.message, success: false };
          this.cdr.detectChanges();
          console.log(this.message)
        }
        console.log('Login User (final):', this.loginUser);
      });
  }
  
}
