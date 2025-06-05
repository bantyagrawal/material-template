import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { USER_TABLE_COLUMNS } from 'src/app/core/models/table.column.model';
import { EditUserComponent } from './edit-user/edit-user.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {

  userList: User[] = [];
  totalUsers = 0;
  currentPage = 0;
  pageSize = 5;
  searchText!: string;
  tableColumns = USER_TABLE_COLUMNS;
  
  constructor(
    private common: CommonService,
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit() {
        this.tableColumns = USER_TABLE_COLUMNS.map(col => {
          if (col.field === 'edit') {
            col.buttons = [
              {
                icon: 'edit',
                type: 'icon',
                tooltip: 'Edit',
                click: record => this.onEdit(record)
              },
            ];
          }
    
          if (col.field === 'delete') {
            col.buttons = [
              {
                icon: 'delete',
                type: 'icon',
                tooltip: 'Delete',
                click: record => this.onDelete(record)
              }
            ];
          }
          return col;
        });
    this.getUsers()
    this.checkDeletePermission();
    this.checkUpdatePermission();
  }

  fetchUsers(event: { pageIndex: number, pageSize: number }) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers(this.currentPage + 1, this.pageSize);
  }

  onSearch(event: string) {
    this.searchText = event;
    this.getUsers();
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }

  openAddUserlDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }


 openEditUserlDialog(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  getUsers(page = 1, limit = 5) {
    const params: any = { page, limit };
    if (this.searchText?.trim()) {
      params.searchTxt = this.searchText.trim();
    }
    this.api.getUser(params).subscribe((res: any) => {
      const { users, meta } = res.data;
      this.userList = users.map((user: any, index: number) => {
        return {
          id: index + 1,
          name: user.name,
          email: user.email,
          mobile: user.mobileNumber,
          role: user.role.roleName,
          userId: user.userId
        }
      })
      this.totalUsers = meta.totalItems;
    })
  }

  checkAddPermission() {
    return this.common.checkAddPermission("Users Management");
  }

  redirectFromPageHeader(data: string) {
    if (data === 'Home') {
      this.common.redirectTo('user');
    }
  }
    checkUpdatePermission() {
    if (!this.common.checkUpdatePermission("Users Management")) {
      const index = this.tableColumns.findIndex(col => col.header === 'Edit');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  checkDeletePermission() {
    if (!this.common.checkDeletePermission("Users Management")) {
      const index = this.tableColumns.findIndex(col => col.header === 'Delete');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  onSortChange(e: any) {
    console.log('Sort changed:', e);
  }

  onSelectionChange(selected: any[]) {
    console.log('Selection changed:', selected);
  }

    onEdit(record: any) {
    console.log('Edit clicked:', record);
    this.openEditUserlDialog()
  }

  onDelete(record: any) {
    console.log('Delete clicked:', record);
  }
}
