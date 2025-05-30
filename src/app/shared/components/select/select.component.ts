import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectData } from 'src/app/core/models/select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() data!: SelectData;
  @Output() selectionChange = new EventEmitter<any>();

  getValidAppearance(value?: string): 'fill' | 'outline' {
  return value === 'fill' || value === 'outline' ? value : 'outline';
}

onfocus() {  
}
}
