import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  myForm!: FormGroup;
  levelOptions = [];
  roles!: any[];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myForm = this.fb.group({
      roleName: ['', Validators.required],
      levelId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getRole();
    this.getLevelOptions();
  }

  get nameControl(): FormControl {
    return this.myForm.get('roleName') as FormControl;
  }

  get levelControl(): FormControl {
    return this.myForm.get('levelId') as FormControl;
  }

  getLevelOptions() {
    this.api.getLevel().subscribe({
      next: (res: any) => {        
        this.levelOptions = res.data.levels.map((level: any) => ({
          label: (level.levelId),
          value: level.uuid
        }));
      }
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      const selectedPermissions = this.roles.map((role) => ({
        moduleId: role.moduleId,
        permission: role.permissions,
      }));
      const roleData = {
        ...this.myForm.value,
        permissions: selectedPermissions,
      };
      this.api.addRole(roleData).subscribe({
        next: (res: any) => {
          this.toastr.success('Role added successfully');
          this.dialogRef.close();
        },
        error: (err: any) => {
        },
      });
    } else {
    }
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
  }

  getRole() {
    this.api.loggedInUser().subscribe((res: any) => {      
      const roleData = res.data;
      console.log('LOGGED IN ROLE', roleData);
      if (roleData) {
        this.roles = roleData.RoleModulePermissions.map((permission: any) => {
          const permissionObj = permission.permission;
          const filteredPermissions = Object.keys(permissionObj)
            .filter((key) => permissionObj[key] === true)
            .reduce((acc: any, key) => {
              acc[key] = false;
              return acc;
            }, {});
          return {
            moduleId: permission.moduleId,
            module: permission.module,
            permissions: filteredPermissions,
          };
        });
      }
    });
  }

  getPermissionKeys(permissions: { [key: string]: boolean }): string[] {
    return Object.keys(permissions);
  }

  isAllChecked(permissions: { [key: string]: boolean }): boolean {
    return Object.values(permissions).every(val => val === true);
  }

  onAllPermissionsChange(role: any, checked: boolean) {
    Object.keys(role.permissions).forEach(key => {
      role.permissions[key] = checked;
    });
  }

  onPermissionChange(role: any, permissionKey: string, checked: boolean) {
    role.permissions[permissionKey] = checked;
  }


}
