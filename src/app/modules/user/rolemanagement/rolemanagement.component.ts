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

  filteredRoles: any[] = [];
  roleList: any[] = [];
  totalRoles = 0;
  currentPage = 0;
  pageSize = 5;

  constructor(
    private common: CommonService
  ) { }

  ngOnInit() {
    this.filteredRoles = [...this.fullRoleList];
    this.totalRoles = this.fullRoleList.length;
    this.fetchUsers({ pageIndex: 0, pageSize: this.pageSize });
  }

  fetchUsers(event: { pageIndex: number, pageSize: number }) {
    const { pageIndex, pageSize } = event;
    this.currentPage = pageIndex;

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.roleList = this.filteredRoles.slice(startIndex, endIndex);
  }

  onSearch(searchText: string) {
    const lowerText = searchText.toLowerCase();
    this.filteredRoles = this.fullRoleList.filter(role =>
      role.name.toLowerCase().includes(lowerText) ||
      role.level.toString().includes(lowerText) ||
      role.id.toString().includes(lowerText)
    );
    this.totalRoles = this.filteredRoles.length;
    this.fetchUsers({ pageIndex: 0, pageSize: this.pageSize });
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }
}
