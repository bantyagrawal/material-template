import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePickerData } from 'src/app/core/models/date.model';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  @Input() data!: DatePickerData;
  @Output() dateChanged = new EventEmitter<Date>();

  onDateChange(event: any): void {
    this.dateChanged.emit(event.value);
  }
}
