import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private common: CommonService,
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getUsers()
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
}
