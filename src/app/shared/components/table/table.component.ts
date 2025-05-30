import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() columnTemplates: { [key: string]: any } = {};
  @Input() customClass!: string;
  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  
  finalDisplayedColumns: string[] = [];
  objectKeys = Object.keys;

  ngOnChanges(changes: SimpleChanges) {
    console.log("DATA", this.data);
    console.log('DISPLAY COLUMN', this.displayedColumns);
    if (changes['displayedColumns']) {
      this.finalDisplayedColumns = [...this.displayedColumns, 'operation'];
    }
  }

  onPageChange(event: any) {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }

  onDelete(row: any): void {
    // Emit event, call a service, or just remove the row from `data`
    console.log('Delete clicked:', row);
  }
}
