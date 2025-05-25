import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm: FormGroup;
  hide: boolean = true; // controls password visibility
  isProcessing: boolean = false;
  errMessage: string = 'Password is required'; // customize based on validation

  constructor(
    private fb: FormBuilder,
    private router: Router // for navigation
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  showPasswordError() {
    const control = this.loginForm.get('password');
    return control?.invalid && (control.dirty || control.touched);
  }

  loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    const { identifier, password } = this.loginForm.value;

    // Simulate login API call
    setTimeout(() => {
      this.isProcessing = false;

      if (identifier === 'admin@example.com' && password === 'admin123') {
        // this.toastr.success('Login successful!');
        this.router.navigate(['/dashboard']); // change route as needed
      } else {
        // this.toastr.error('Invalid credentials');
      }
    }, 1500);
  }

}
