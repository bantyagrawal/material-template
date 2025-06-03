import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() pageOnFront = false;
  @Input() list: any[] = [];
  @Input() columns: MtxGridColumn[] = [];
  @Input() isLoading = false;
  @Input() multiSelectable = true;
  @Input() rowSelectable = true;
  @Input() hideRowSelectionCheckbox = false;
  @Input() showToolbar = true;
  @Input() columnHideable = true;
  @Input() columnSortable = false;
  @Input() columnPinnable!: boolean;
  @Input() rowHover = false;
  @Input() rowStriped = false;
  @Input() expandable = false;
  @Input() showPaginator = true;
  @Input() columnResizable = false;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 50, 100];
  @Input() totalItems = 0;
  @Input() expansionTpl!: TemplateRef<any>;
  @Output() sortChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  changeSort(e: any) {
    this.sortChange.emit(e);
  }
  changeSelect(e: any) {
    this.selectionChange.emit(e);
  }
  onPageChange(event: any) {
    console.log("EVENT", event);
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
  edit(record: any) {
    console.log('data', this.list);
    this.editClicked.emit(record);
  }
  delete(record: any) {
    this.deleteClicked.emit(record);
  }

  logPin(event: any) {
    console.log("EVENT", event);
    console.log("PINNED", this.columnPinnable);
    
  }
}
