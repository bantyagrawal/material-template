import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { LevelDialogComponent } from './level-dialog/level-dialog.component';
import { ApiService } from 'src/app/core/services/api.service';

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

  constructor(
    private common: CommonService,
    private api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getLevel();
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

}
