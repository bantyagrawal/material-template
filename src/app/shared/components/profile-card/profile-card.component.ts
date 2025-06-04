import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() user: any;
  @Input() data: any;
  @Output() logoutClicked = new EventEmitter<void>();

  logout() {
    this.logoutClicked.emit();
  }
}
