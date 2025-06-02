import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { LevelDialogComponent } from './level-dialog/level-dialog.component';
import { ApiService } from 'src/app/core/services/api.service';
import { LEVEL_TABLE_COLUMNS } from 'src/app/core/models/table.column.model';

@Component({
  selector: 'app-levelmanagement',
  templateUrl: './levelmanagement.component.html',
  styleUrls: ['./levelmanagement.component.scss']
})
export class LevelmanagementComponent {

  levelList: any[] = [];
  totalLevels = 0;
  currentPage = 0;
  pageSize = 5;
  searchText!: string;
  tableColumns = LEVEL_TABLE_COLUMNS;


  constructor(
    private common: CommonService,
    private api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tableColumns = LEVEL_TABLE_COLUMNS.map(col => {
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
    this.getLevel();
    this.checkDeletePermission();
    this.checkUpdatePermission();
  }


  fetchLevels(event: { pageIndex: number, pageSize: number }) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getLevel(this.currentPage + 1, this.pageSize);
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
    this.getLevel();
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }

  openAddLevelDialog(): void {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLevel();
      }
    });
  }

  getLevel(page = 1, limit = 5) {
    let params: any = { page, limit };
    if (this.searchText?.trim()) {
      params.searchTxt = this.searchText.trim();
    }
    this.api.getLevel(params).subscribe({
      next: (res: any) => {
        const { levels, meta } = res.data;
        this.levelList = levels.map((level: any, index: number) => ({
          id: index + 1,
          name: `Level ${level.levelId}`,
          level: level.levelId
        }));
        this.totalLevels = meta.totalItems
      }
    })
  }

  checkAddPermission() {
    return this.common.checkAddPermission("Level Management");
  }


    redirectFromPageHeader(data: string) {
    if (data === 'Home') {
      this.common.redirectTo('user');
    }
  }

    checkUpdatePermission() {
    if (!this.common.checkUpdatePermission("Level Management")) {
      const index = this.tableColumns.findIndex(col => col.header === 'Edit');
      if (index !== -1) {
        this.tableColumns.splice(index, 1);
      }
    }
  }

  checkDeletePermission() {
    if (!this.common.checkDeletePermission("Level Management")) {
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
    console.log(this.levelList);

    console.log('Edit clicked:', record);
  }

  onDelete(record: any) {
    console.log('Delete clicked:', record);
  }

}
