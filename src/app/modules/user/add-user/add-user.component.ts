import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      date: [null, Validators.required],
      address: ['', Validators.required]
    });
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

  onSubmit() {
          // console.log('Form Value:', this.myForm.value);

    if (this.myForm.valid) {
      console.log('Form Value:', this.myForm.value);
    }
  }

  handleChange(event: Event) {
    
    const input = event.target as HTMLInputElement;
    console.log('Input value from event:', input.value);
  }
}
