import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AddModuleComponent } from './add-module/add-module.component';

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

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getModules();
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
    // this.api.getModules(params).subscribe((res: any) => {
    //   const { modules, meta } = res.data;
    //   this.moduleList = modules.map((module: any, index: number) => ({
    //     id: (page - 1) * limit + index + 1,
    //     name: module.moduleName,
    //     description: module.description
    //   }));
    //   this.totalModules = meta.totalItems;
    // });
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
  maxHeight: 'none',      
  panelClass: 'custom-dialog-container'
});



  dialogRef.afterClosed().subscribe(result => {
    this.getModules();
  });
}


}
