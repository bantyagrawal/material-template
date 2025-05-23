import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import screenfull from 'screenfull';
import { CommonService } from 'src/app/core/services/common.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private common: CommonService) { }
  messages = ['Server Error Reports 1', 'Server Error Reports 2', 'Server Error Reports 3'];
  @Input() showToggle = true;
  @Input() showBranding = true;
  @Output() menuToggle = new EventEmitter<void>();

  onToggle() {
    this.menuToggle.emit();
  }
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }

}
