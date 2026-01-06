import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  userData: UserI|null = null;

  errormsg: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  registerationForm = new FormGroup({
  userName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
  email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  gender: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
});


  submitHandler() {
    if (this.registerationForm.invalid) {
      this.errormsg = 'Please fill all fields correctly before submitting.';
      return;
    }

    const user: UserI = this.registerationForm.getRawValue();

    this.authService.postUserData(user).subscribe({
      next: (data) => {
        this.userData = data;
        console.log('user data is posted', this.userData);
        alert('User is created!!');
        this.registerationForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error registering', err);
        alert('Error registering');
      },
    });
  }
}
