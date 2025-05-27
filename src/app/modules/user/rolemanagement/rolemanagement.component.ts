import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AddRoleComponent } from './add-role/add-role.component';
import { MatDialog } from '@angular/material/dialog';

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
  @ViewChild('statusTemplate') statusTemplate: any;
  columnTemplatesMap: { [key: string]: any } = {};

  constructor(
    private common: CommonService,
    private api: ApiService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.getRole();
  }

  ngAfterViewInit() {
    this.columnTemplatesMap = {
      status: this.statusTemplate
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
    console.log("OPENED DIALOG", data);
  }
}
