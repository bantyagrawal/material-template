import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputData } from 'src/app/core/models/input.model';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

    @Input() data!: InputData;
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<Event>();
}
