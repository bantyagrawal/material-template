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

  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
    }
  }

  onPageChange(event: any) {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}
