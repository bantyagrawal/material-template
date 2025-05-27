import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent {

  constructor(
    public dialogRef: MatDialogRef<RoleUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  roles = [
    {
      module: { name: 'User Management' },
      permissions: { write: true, update: false, delete: false, read: true }
    },
    {
      module: { name: 'Role Management' },
      permissions: { write: false, update: true, delete: false, read: true }
    }
  ];

  isAllChecked(permissions: any): boolean {
    return permissions.write && permissions.update && permissions.delete && permissions.read;
  }

  onAllPermissionsChange(role: any, isChecked: boolean) {
    role.permissions.write = isChecked;
    role.permissions.update = isChecked;
    role.permissions.delete = isChecked;
    role.permissions.read = isChecked;
  }

  onPermissionChange(role: any, permissionKey: string, isChecked: boolean) {
    role.permissions[permissionKey] = isChecked;
  }

  removeModule(roleToRemove: any) {
  this.roles = this.roles.filter(role => role !== roleToRemove);
}
  onClose() {
    this.dialogRef.close();
  }


}
