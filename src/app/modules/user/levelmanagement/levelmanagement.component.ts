import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { LevelDialogComponent } from '../level-dialog/level-dialog.component';

@Component({
  selector: 'app-levelmanagement',
  templateUrl: './levelmanagement.component.html',
  styleUrls: ['./levelmanagement.component.scss']
})
export class LevelmanagementComponent {

  fullLevelList: any[] = [
    { id: 1, name: 'Level 1', level: 1 },
    { id: 2, name: 'Level 2', level: 2 },
    { id: 3, name: 'Level 3', level: 3 },
    { id: 4, name: 'Level 4', level: 4 },
    { id: 5, name: 'Level 5', level: 5 },
  ];

  filteredLevels: any[] = [];
  levelList: any[] = [];
  totalRoles = 0;
  currentPage = 0;
  pageSize = 5;

  constructor(
    private common: CommonService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.filteredLevels = [...this.fullLevelList];
    this.totalRoles = this.fullLevelList.length;
    this.fetchUsers({ pageIndex: 0, pageSize: this.pageSize });
  }

  fetchUsers(event: { pageIndex: number, pageSize: number }) {
    const { pageIndex, pageSize } = event;
    this.currentPage = pageIndex;

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.levelList = this.filteredLevels.slice(startIndex, endIndex);
  }

  onSearch(searchText: string) {
    const lowerText = searchText.toLowerCase();
    this.filteredLevels = this.fullLevelList.filter(level =>
      level.name.toLowerCase().includes(lowerText) ||
      level.level.toString().includes(lowerText) ||
      level.id.toString().includes(lowerText)
    );
    this.totalRoles = this.filteredLevels.length;
    this.fetchUsers({ pageIndex: 0, pageSize: this.pageSize });
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }

  openAddLevelDialog(): void {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
      // width: '400px',
      // maxWidth: '95vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Level added:', result);
      }
    });
  }

}
