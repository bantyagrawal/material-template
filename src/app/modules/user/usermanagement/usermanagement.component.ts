import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AddUserComponent } from '../add-user/add-user.component';
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

  fullUserList: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
    { id: 4, name: 'Daisy Ray', email: 'daisy@example.com', role: 'User' },
    { id: 5, name: 'Ethan Miller', email: 'ethan@example.com', role: 'Admin' },
    { id: 6, name: 'Fiona White', email: 'fiona@example.com', role: 'User' },
    { id: 7, name: 'George Blake', email: 'george@example.com', role: 'Viewer' },
    { id: 8, name: 'Hannah Grey', email: 'hannah@example.com', role: 'Editor' },
    { id: 9, name: 'Ian Clarke', email: 'ian@example.com', role: 'User' },
    { id: 10, name: 'Jenny Green', email: 'jenny@example.com', role: 'Admin' },
    { id: 11, name: 'Kevin Knight', email: 'kevin@example.com', role: 'User' },
    { id: 12, name: 'Lily Evans', email: 'lily@example.com', role: 'Viewer' },
    { id: 13, name: 'Mark Lee', email: 'mark@example.com', role: 'Editor' },
    { id: 14, name: 'Nina Brown', email: 'nina@example.com', role: 'Admin' }
  ];

  filteredUsers: User[] = [];
  userList: User[] = [];
  totalUsers = 0;
  currentPage = 0;
  pageSize = 5;

  constructor(
    private common: CommonService,
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.filteredUsers = [...this.fullUserList];
    this.totalUsers = this.filteredUsers.length;
    this.fetchUsers({ pageIndex: 0, pageSize: this.pageSize });
    this.getUsers()
  }

  fetchUsers(event: { pageIndex: number, pageSize: number }) {
    const { pageIndex, pageSize } = event;
    this.currentPage = pageIndex;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.userList = this.filteredUsers.slice(startIndex, endIndex);
  }

  onSearch(searchText: string) {
    const lowerText = searchText.toLowerCase();
    this.filteredUsers = this.fullUserList.filter(user =>
      user.name.toLowerCase().includes(lowerText) ||
      user.email.toLowerCase().includes(lowerText) ||
      user.role.toLowerCase().includes(lowerText)
    );
    this.totalUsers = this.filteredUsers.length;
    this.fetchUsers({ pageIndex: 0, pageSize: this.pageSize });
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }

  openAddUserlDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      // width: '400px',
      // maxWidth: '95vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Level added:', result);
      }
    });
  }
  getUsers(page = 1, limit = 5) {
    const params: any = {
      page,
      limit
    };
    // if (this.searchText?.trim()) {
    //   params.searchTxt = this.searchText.trim();
    // }
    this.api.getUser(params).subscribe((res: any) => {
      console.log("RESPONSE DATA", res.data);

      // this.userDetailsList = res.data
      // const modules = res.data.users || [];
      // this.dataSource = new MatTableDataSource(modules);
      // this.metaData = {
      //   currentPage: res.data.meta.currentPage,
      //   itemsPerPage: res.data.meta.itemsPerPage,
      //   totalItems: res.data.meta.totalItems,
      //   totalPages: res.data.meta.totalPages
      // };

      // this.cdr.detectChanges(); 
    })
  }
}
