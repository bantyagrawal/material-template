import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', [Validators.required]],
    });
  }

   get levelControl(): FormControl {
      return this.myForm.get('level') as FormControl;
    }
  
    get nameControl(): FormControl {
      return this.myForm.get('name') as FormControl;
    }

  onSubmit() {
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log('Input value from event:', input.value);
  }
}
