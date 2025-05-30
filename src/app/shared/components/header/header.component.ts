import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import screenfull from 'screenfull';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    isDarkTheme = false;

  constructor(
    private common: CommonService,
    private api: ApiService
  ) { }
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

  logout() {
    this.api.logOut().subscribe((res: any) => {
      this.redirectTo('login');
    })
  }

toggleDarkMode() {
  this.isDarkTheme = !this.isDarkTheme;
  const body = document.body;

  if (this.isDarkTheme) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
}



}
