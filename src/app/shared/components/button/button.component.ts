import { Component, Input } from '@angular/core';
import { ButtonData } from 'src/app/core/models/button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() data!: ButtonData;

}
