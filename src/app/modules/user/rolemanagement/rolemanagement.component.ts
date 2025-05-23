import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.scss']
})
export class RolemanagementComponent {

  fullRoleList: any[] = [
    { id: 1, name: 'ADMIN', level: 1 },
    { id: 2, name: 'SUB-ADMIN', level: 2 },
    { id: 3, name: 'BIG-ADMIN', level: 3 },
    { id: 4, name: 'USER', level: 4 },
    { id: 5, name: 'SUB-USER', level: 5 },
  ];

  roleList: any[] = [];
  totalRoles = 0;
  currentPage = 0;

  constructor(
    private common: CommonService
  ) { }

  ngOnInit() {
    this.totalRoles = this.fullRoleList.length;
    this.fetchUsers({ pageIndex: 0, pageSize: 5 });
  }

  fetchUsers(event: { pageIndex: number, pageSize: number }) {
    const { pageIndex, pageSize } = event;
    this.currentPage = pageIndex;

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.roleList = this.fullRoleList.slice(startIndex, endIndex);
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }
}
