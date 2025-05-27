import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent {

  roleData: any;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RoleUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roleData = JSON.parse(JSON.stringify(this.data));
    this.getRole();
  }

  isAllChecked(permissions: { [key: string]: boolean }): boolean {
    return Object.values(permissions).every(val => val === true);
  }

  onAllPermissionsChange(permission: any, checked: boolean) {
    Object.keys(permission.permission).forEach(key => {
      permission.permission[key] = checked;
    });
  }

  onPermissionChange(permission: any, permissionKey: string, isChecked: boolean) {
    permission.permission[permissionKey] = isChecked;
  }

  getPermissionKeys(permission: { [key: string]: boolean }): string[] {
    return Object.keys(permission);
  }

  onClose() {
    this.dialogRef.close();
  }

  getRole() {
    this.api.loggedInUser().subscribe((res: any) => {
      res.data.RoleModulePermissions.map((ele: any) => {
        const index = this.roleData.permissions.findIndex((obj: any) => obj.moduleId == ele.moduleId);
        if (index != -1) {
          for (const key in ele.permission) {
            if (!this.roleData.permissions[index].permission[key]) {
              this.roleData.permissions[index].permission[key] = false;
            }
          }
        }
        else {
          let default_permission = ele.permission;
          for (let key in default_permission) {
            if (typeof default_permission[key] === "boolean") {
              default_permission[key] = false;
            }
          }
          this.roleData.permissions.push({ ...ele, permissionId: "", uuid: "", permission: default_permission })
        }
      })
    });
  }

  updatePermission() {
    const updatedData = this.roleData.permissions.map((item: any) => {
      return {
        ...item.permission,
        uuid: item.permissionId,
        moduleId: item.moduleId
      };
    });
    const requestBody = {
      roleId: this.roleData.roleId,
      permissions: updatedData
    };
    this.api.updateRole(requestBody).subscribe({
      next: (res: any) => {
        this.toastr.success('Permission updated successfully');
        this.dialogRef.close(res.data);
      },
      error: (err: any) => {
      }
    });
    this.onClose();
  }
}
