import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  userForm: FormGroup;
  nameControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  mobileControl = new FormControl('', Validators.required);
  userIdControl = new FormControl('', Validators.required);
  roleControl = new FormControl('', Validators.required);
  userTypeControl = new FormControl('', Validators.required);

  roleOptions = [];

  userTypeOptions = [
    { label: 'Sequelize', value: 'SEQUELIZE' },
    { label: 'Non-Sequelize', value: 'NON-SEQUELIZE' }
  ];

  constructor(private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {    
    this.userForm = this.fb.group({
      name: this.nameControl,
      email: this.emailControl,
      mobile: this.mobileControl,
      userId: this.userIdControl,
      role: this.roleControl,
      userType: this.userTypeControl
    });

    this.userForm.patchValue({
      name: this.data.name,
      email: this.data.email,
      mobile: this.data.mobile,
      userId: this.data.userId,
      role: this.data.roleId,
      userType: this.data.user_type
    })
    this.getChildRole();

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
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

}
