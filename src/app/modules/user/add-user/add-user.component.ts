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

  constructor(private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      date: [null, Validators.required],
      address: ['', Validators.required],
      select: ['active', Validators.required]
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

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Value:', this.myForm.value);
    }
  }

  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Input value from event:', input.value);
  }

  onStatusChange(value: any): void {
    console.log('Selected Status:', value);
  }
}
