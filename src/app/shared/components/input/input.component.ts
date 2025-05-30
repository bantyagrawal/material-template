import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputData } from 'src/app/core/models/input.model';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() data!: InputData;
  @Input() customClass?: string;
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<Event>();

  hidePassword = true;

  get inputType(): string {
    if (this.data.type === 'password' && this.data.isPasswordToggle) {
      return this.hidePassword ? 'password' : 'text';
    }
    return this.data.type || 'text';
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onChangeTrigger(event: Event) {
    this.onChange.emit(event)
  }

  onfocus(event: Event) {
    this.onFocus.emit(event)
 }
  ngOnChanges() {
  }
}
