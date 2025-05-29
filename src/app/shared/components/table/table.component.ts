import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  
  tableData = [
    {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      gender: 'male',
      telephone: '010-12345678',
      birthday: '1607926887075',
      city: 'New York',
      address: '555 Lexington Avenue',
      company: 'matero',
      website: 'www.matero.com',
      email: '-',
      selected: false // Add a selected property for checkbox state
    },
    {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      gender: 'male',
      telephone: '010-23456781',
      birthday: '1607926887075',
      city: 'Shanghai',
      address: '88 Songshan Road',
      company: 'matero',
      website: 'www.matero.com',
      email: '-',
      selected: false
    },
    {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      gender: 'male',
      telephone: '010-34567812',
      birthday: '1607926887075',
      city: 'Los Angeles',
      address: '48400 Seminole Dr., Cabazon',
      company: 'matero',
      website: 'www.matero.com',
      email: '-',
      selected: false
    },
    {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      gender: 'male',
      telephone: '010-45678123',
      birthday: '1607926887075',
      city: 'Beijing',
      address: 'chaoyang',
      company: 'matero',
      website: 'www.matero.com',
      email: '-',
      selected: false
    },
    {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      gender: 'male',
      telephone: '010-56781234',
      birthday: '1607926887075',
      city: 'Berlin',
      address: 'Bernauer Str. 111',
      company: 'matero',
      website: 'www.matero.com',
      email: '-',
      selected: false
    }
  ];

  columns = [
    'Position',
    'Name',
    'Weight',
    'Symbol',
    'Gender',
    'Telephone',
    'Birthday',
    'City',
    'Address',
    'Company',
    'Website',
    'Email',
    'Operation'
  ];

  // Track "select all" state
  selectAll: boolean = false;

  // Handle "select all" checkbox change
  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectAll = checked;
    this.tableData.forEach(row => (row.selected = checked));
  }

  // Update "select all" state when individual checkboxes change
  updateSelectAll(): void {
    this.selectAll = this.tableData.every(row => row.selected);
  }

  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() columnTemplates: { [key: string]: any } = {};
  @Input() customClass!: string;
  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  objectKeys = Object.keys;

  ngOnChanges(changes: SimpleChanges) {
    console.log("DATA", this.data);
    console.log('DISPLAY COLUMN', this.displayedColumns);
    if (changes) {
    }
  }

  onPageChange(event: any) {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}
