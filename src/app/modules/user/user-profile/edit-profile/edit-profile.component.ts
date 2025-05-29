import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  reactiveForm!: FormGroup;
  data:any;
  roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Manager', value: 'manager' },
    { label: 'Guest', value: 'guest' }
  ];

  constructor(private fb: FormBuilder , private apiService: ApiService, profile:CommonService) {
    this.data=profile.permissions;
    console.log('Permissions data from CommonService (constructor):', this.data);
  }

 

  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ipv4: ['', Validators.required],
      ipv6: ['', Validators.required],
      userId: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      deviceId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      walletType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted:', this.reactiveForm.value);
    } else {
      this.reactiveForm.markAllAsTouched();
    }
  }

  get nameControl(): FormControl {
    return this.reactiveForm.get('name') as FormControl;
  }
  get emailControl(): FormControl {
    return this.reactiveForm.get('email') as FormControl;
  }
  get ipv4Control(): FormControl {
    return this.reactiveForm.get('ipv4') as FormControl;
  }
  get ipv6Control(): FormControl {
    return this.reactiveForm.get('ipv6') as FormControl;
  }
  get userIdControl(): FormControl {
    return this.reactiveForm.get('userId') as FormControl;
  }
  get mobileControl(): FormControl {
    return this.reactiveForm.get('mobile') as FormControl;
  }
  get deviceIdControl(): FormControl {
    return this.reactiveForm.get('deviceId') as FormControl;
  }
  get walletTypeControl(): FormControl {
    return this.reactiveForm.get('walletType') as FormControl;
  }
}
