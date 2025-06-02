import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AddModuleComponent } from './add-module/add-module.component';
import { CommonService } from 'src/app/core/services/common.service';
import { MODULE_TABLE_COLUMNS } from 'src/app/core/models/table.column.model';
@Component({
  selector: 'app-modulemanagement',
  templateUrl: './modulemanagement.component.html',
  styleUrls: ['./modulemanagement.component.scss']
})
export class ModulemanagementComponent {

  moduleList: any[] = [];
  totalModules = 0;
  currentPage = 0;
  pageSize = 5;
  searchText = '';
  tableColumns = MODULE_TABLE_COLUMNS;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.tableColumns = MODULE_TABLE_COLUMNS.map(col => {
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
    this.getModules();
    this.checkDeletePermission();
    this.checkUpdatePermission();
  }

  fetchModules(event: { pageIndex: number; pageSize: number }) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getModules(this.currentPage + 1, this.pageSize);
  }

  getModules(page = 1, limit = 5) {
    const params: any = { page, limit };
    if (this.searchText?.trim()) {
      params.searchTxt = this.searchText.trim();
    }
    this.api.getModules(params).subscribe((res: any) => {
      const { modules, meta } = res.data;
      this.moduleList = modules.map((module: any, index: number) => ({
        id: (page - 1) * limit + index + 1,
        name: module.name,
        description: module.description
      }));
      this.totalModules = meta.totalItems;
    });
  }

  onSearch(event: string) {
    this.searchText = event;
    this.getModules();
  }

  openAddModuleDialog(): void {
    const dialogRef = this.dialog.open(AddModuleComponent, {
      width: '400px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '',
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getModules();
      }
    });
  }

  checkAddPermission() {
    return this.common.checkAddPermission("Module Management");
  }

    redirectFromPageHeader(data: string) {
    if (data === 'Home') {
      this.common.redirectTo('user');
    }
  }
  checkUpdatePermission() {
    if (!this.common.checkUpdatePermission("Module Management")) {
      const index = this.tableColumns.findIndex(col => col.header === 'Edit');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  checkDeletePermission() {
    console.log("DELETE PERMISSION",this.common.checkDeletePermission("Module Management"));
    
    if (!this.common.checkDeletePermission("Module Management")) {
      const index = this.tableColumns.findIndex(col => col.header === 'Delete');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  onSortChange(e: any) {
    console.log('Sort changed:', e);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    console.log('Page change:', event);
  }

  onSelectionChange(selected: any[]) {
    console.log('Selection changed:', selected);
  }

  onEdit(record: any) {
    console.log('Edit clicked:', record);
  }

  onDelete(record: any) {
    console.log('Delete clicked:', record);
  }
}
