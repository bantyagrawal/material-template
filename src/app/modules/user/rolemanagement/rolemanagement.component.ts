import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';

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
  constructor(
    private common: CommonService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getRole();
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
        id: (page - 1) * limit + index + 1,
        name: role.roleName,
        level: `Level ${role.level.levelId}`
      }));
      this.totalRoles = meta.totalItems;
    });
  }

  onSearch(event: string) {
    this.searchText = event;
    this.getRole();
  }
}
