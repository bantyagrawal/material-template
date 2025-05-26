import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  myForm!: FormGroup;

  levelOptions = [];

  modules = [
    { label: 'Module A', value: 'moduleA' },
    { label: 'Module B', value: 'moduleB' }
  ];

  permissionTypes = [
    { label: 'Read', value: 'read' },
    { label: 'Write', value: 'write' },
    { label: 'Update', value: 'update' },
    { label: 'Delete', value: 'delete' }
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      permissions: this.fb.group({
        moduleA: this.fb.group({
          read: [false],
          write: [false],
          update: [false],
          delete: [false],
        }),
        moduleB: this.fb.group({
          read: [false],
          write: [false],
          update: [false],
          delete: [false],
        }),
      })
    });
  }
  ngOnInit(): void {
    this.getLevelOptions();
  }

  get nameControl(): FormControl {
    return this.myForm.get('name') as FormControl;
  }

  get levelControl(): FormControl {
    return this.myForm.get('level') as FormControl;
  }

  get permissionsControl(): FormGroup {
    return this.myForm.get('permissions') as FormGroup;
  }

  getModuleControl(moduleName: string): FormGroup {
    return this.permissionsControl.get(moduleName) as FormGroup;
  }

isAllChecked(moduleName: string): boolean {
  const moduleGroup = this.getModuleControl(moduleName);
  return this.permissionTypes.every(perm => moduleGroup.get(perm.value)?.value);
}

onAllPermissionChange(moduleName: string, checked: boolean) {
  const moduleGroup = this.getModuleControl(moduleName);
  this.permissionTypes.forEach(perm => {
    moduleGroup.get(perm.value)?.setValue(checked);
  });
}



  getLevelOptions() {
    this.api.getLevel('getLevel').subscribe({
      next: (res: any) => {
        this.levelOptions = res.data.map((level: any) => ({
          label: (level.levelId),
          value: level.levelId
        }));
      }
    })
  }


  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form Data:', this.myForm.value);
    } else {
      console.log('Form is invalid.');
    }
  }



  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log('Input value from event:', input.value);
  }

  onPermissionChange(moduleName: string, permission: string, checked: boolean) {
    const moduleGroup = this.getModuleControl(moduleName);
    moduleGroup.get(permission)?.setValue(checked);
  }

}
