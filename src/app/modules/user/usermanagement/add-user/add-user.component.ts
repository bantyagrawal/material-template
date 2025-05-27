import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectData } from 'src/app/core/models/select.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  myForm!: FormGroup;
  selectData!: SelectData;
  walletOptions: any = [];
  roleOptions: any = [];
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      date: [null, Validators.required],
      address: ['', Validators.required],
      select: ['active', Validators.required],
      deviceId: ['', Validators.required],
      userId: ['', Validators.required],
      role: ['', Validators.required],
      iv4: ['', Validators.required],
      iv6: ['', Validators.required],
      walletType: ['', Validators.required],
    });

    this.selectData = {
      label: 'Status',
      control: this.selectControl,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ],
      placeholder: 'Choose status',
      appearance: 'fill',
      customClass: 'my-input-style',
      errorMessage: 'Please choose a status'
    };
  }

  get emailControl(): FormControl {
    return this.myForm.get('email') as FormControl;
  }

  get addressControl(): FormControl {
    return this.myForm.get('address') as FormControl;
  }

  get dateControl(): FormControl {
    return this.myForm.get('date') as FormControl;
  }

  get mobileControl(): FormControl {
    return this.myForm.get('mobile') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.myForm.get('password') as FormControl;
  }

  get nameControl(): FormControl {
    return this.myForm.get('name') as FormControl;
  }

  get selectControl(): FormControl {
    return this.myForm.get('select') as FormControl;
  }

  get deviceIdControl(): FormControl {
    return this.myForm.get('deviceId') as FormControl;
  }

  get userIdControl(): FormControl {
    return this.myForm.get('userId') as FormControl;
  }

  get iv4Control(): FormControl {
    return this.myForm.get('iv4') as FormControl;
  }

  get iv6Control(): FormControl {
    return this.myForm.get('iv6') as FormControl;
  }

  get roleControl(): FormControl {
    return this.myForm.get('role') as FormControl;
  }

  get walletControl(): FormControl {
    return this.myForm.get('walletType') as FormControl;
  }
  onSubmit(): void {
    if (this.myForm.valid) {
    }
  }

  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
  }

  onStatusChange(value: any): void {
  }
}
