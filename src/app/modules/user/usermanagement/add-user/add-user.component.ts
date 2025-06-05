import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SelectData } from 'src/app/core/models/select.model';
import { SelectOption } from 'src/app/core/models/select.model';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  myForm!: FormGroup;
  selectData!: SelectData;
  walletOptions: SelectOption[] = [
    {
      label: 'SINGLE',
      value: 'Single'
    },
    {
      label: 'MULTI',
      value: 'Multi'
    },
    {
      label: 'BOTH',
      value: 'Both'
    }
  ];

  userTypeOptions: SelectOption[] = [
    { label: 'Sequelize', value: 'SEQUELIZE' },
    { label: 'Non-Sequelize', value: 'NON-SEQUELIZE' }

  ];
  roleOptions!: SelectOption[];
  isProcessing!: boolean;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getChildRole();
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      userId: ['', Validators.required],
      password: [
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      ipv4: ['', Validators.required],
      ipv6: ['', Validators.required],
      deviceId: ['', Validators.required],
      walletType: ['', Validators.required],
      user_type: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  get nameControl(): FormControl {
    return this.myForm.get('name') as FormControl;
  }

  get userIdControl(): FormControl {
    return this.myForm.get('userId') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.myForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.myForm.get('confirmPassword') as FormControl;
  }

  get emailControl(): FormControl {
    return this.myForm.get('email') as FormControl;
  }

  get mobileControl(): FormControl {
    return this.myForm.get('mobileNumber') as FormControl;
  }

  get iv4Control(): FormControl {
    return this.myForm.get('ipv4') as FormControl;
  }

  get iv6Control(): FormControl {
    return this.myForm.get('ipv6') as FormControl;
  }

  get deviceIdControl(): FormControl {
    return this.myForm.get('deviceId') as FormControl;
  }

  get walletControl(): FormControl {
    return this.myForm.get('walletType') as FormControl;
  }

  get roleControl(): FormControl {
    return this.myForm.get('role') as FormControl;
  }

  get userTypeControl(): FormControl {
    return this.myForm.get('user_type') as FormControl;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.myForm.get('password')?.value);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.myForm.get('password')?.value);
  }

  hasNumber(): boolean {
    return /\d/.test(this.myForm.get('password')?.value);
  }

  hasSpecialCharacter(): boolean {
    return /[@$!%*?&]/.test(this.myForm.get('password')?.value);
  }

  showConfirmPasswordError(): string {
    const password = this.myForm.get('password');
    const confirmPasswordControl = this.myForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return "Confirm password is required";
    }
    if (password?.value != confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
      return "Password and confirm password do not match";
    }
    confirmPasswordControl?.setErrors(null);
    return '';
  }

  showPasswordError(): string {
    const passwordControl = this.myForm.get('password');

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
    return '';
  }

  getChildRole() {
    this.api.getChildRole().subscribe({
      next: (res: any) => {
        if (res.data.length === 0) {
          this.toastr.error('Please add the child role first');
          this.dialogRef.close();
        }
        this.roleOptions = res.data.map((item: any) => {
          return { label: item.roleName, value: item.uuid }
        })
      }
    })
  }

  onSubmit() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    if (this.myForm.invalid) {
      this.isProcessing = false;
      this.toastr.error('Form invailid');
      return;
    }
    let newUser = this.myForm.value;

    if (newUser) {
      newUser.deviceIdVerified = true;
      newUser.emailVerified = true;
      newUser.ipv4Verified = true;
      newUser.ipv6Verified = true;
      newUser.mobileVerified = true;
      newUser.multiLogin = true;
      delete newUser.confirmPassword;
    }

    this.api.AddUser(newUser).subscribe({
      next: (res: any) => {
        this.toastr.success('User added successfully!');
        this.myForm.reset();
        this.isProcessing = false;
        this.dialogRef.close(res.data);
      },
      error: (err: any) => {
        this.isProcessing = false;
        this.dialogRef.close();

      },
    });
  }
}
