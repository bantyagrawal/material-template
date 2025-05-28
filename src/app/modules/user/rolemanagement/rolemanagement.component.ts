import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AddRoleComponent } from './add-role/add-role.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.scss']
})
export class RolemanagementComponent implements OnInit {

  roleList: any[] = [];
  totalRoles = 0;
  currentPage = 0;
  pageSize = 5;
  searchText = '';
  tableColumns: string[] = ['id', 'name', 'level', 'status'];
  @ViewChild('statusTemplate') statusTemplate: any;
  @ViewChild('deleteTemplate') deleteTemplate: any;

  columnTemplatesMap: { [key: string]: any } = {};

  constructor(
    private common: CommonService,
    private api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkUpdatePermission();
    this.checkDeletePermission();
    this.getRole();
  }

  ngAfterViewInit() {
    this.columnTemplatesMap = {
      status: this.statusTemplate,
      delete: this.deleteTemplate
    };
  }

  fetchUsers(event: { pageIndex: number; pageSize: number }) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getRole(this.currentPage + 1, this.pageSize);
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }

  getRole(page = 1, limit = 5) {
    let params: any = { page, limit };
    if (this.searchText?.trim()) {
      params.searchTxt = this.searchText.trim();
    }
    this.api.getRole(params).subscribe((res: any) => {
      const { roles, meta } = res.data;
      this.roleList = roles.map((role: any, index: number) => ({
        id: index + 1,
        name: role.roleName,
        level: `Level ${role.level.levelId}`,
        roleId: role.uuid,
        permissions: role.RoleModulePermissions
      }));
      this.totalRoles = meta.totalItems;
    });
  }

  onSearch(event: string) {
    this.searchText = event;
    this.getRole();
  }

  openAddRolelDialog(): void {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRole();
    });
  }

  permissions(module: string, operation: string) {
    const result = this.common.checkpermission(module, operation);
    return result;
  }

  openPermissionDialog(data: any) {
    const dialogRef = this.dialog.open(RoleUpdateComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRole();
    });
  }

  deleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
      panelClass: 'dialog-layout',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
      data
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.getRole()
    });
  }

  checkUpdatePermission() {
    if (!this.common.checkUpdatePermission('Role Management')) {
      const index = this.tableColumns.indexOf('status');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  checkDeletePermission() {
    if (!this.common.checkDeletePermission('Role Management')) {
      const index = this.tableColumns.indexOf('delete');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  openDeleteDialog(data: any) {
    this.deleteDialog('500ms', '500ms', data)
  }
}
