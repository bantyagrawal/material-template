import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { DecryptionService } from 'src/app/core/services/decryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  hide: boolean = true;
  isProcessing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private encry: DecryptionService,
    private api: ApiService,
    private common: CommonService

  ) {
    this.loginForm = new FormGroup({
      identifier: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/
        ),
      ]),
    });
  }

  get identifierControl(): FormControl {
    return this.loginForm.get('identifier') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.loginForm.get('password')?.value);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.loginForm.get('password')?.value);
  }

  hasNumber(): boolean {
    return /\d/.test(this.loginForm.get('password')?.value);
  }

  hasSpecialCharacter(): boolean {
    return /[@$!%*?&]/.test(this.loginForm.get('password')?.value);
  }

  showPasswordError(): string {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl?.hasError('required')) {
      return "Password is required";
    }
    if (passwordControl?.hasError('minlength')) {
      return "Password should be more then 6 digit";
    }
    if (!this.hasUppercase()) {
      return "Password must have one upper case";
    }
    if (!this.hasLowercase()) {
      return "Password must have one lowwer case";
    }
    if (!this.hasNumber()) {
      return "Password must have one digit";
    }
    if (!this.hasSpecialCharacter()) {
     return "Password must have one special latter";
    }
    return "";
  }

  loginSubmit(): void {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;

    if (this.loginForm.invalid) {
      this.isProcessing = false;
      this.toastr.error('Form is invalid');
      return;
    }
    const encryptedData = this.encry.encrypt(this.loginForm.value);
    this.api.login({ encryptedData }).subscribe({
      next: async (res: any) => {
        try {
          await this.common.assignPermission();
          this.router.navigate(['/user']);
          this.toastr.success('Login Successful');
        } catch (error) {
        } finally {
          this.isProcessing = false;
        }
      },
      error: (err: any) => {
        this.isProcessing = false;
      }
    });
  }
}
