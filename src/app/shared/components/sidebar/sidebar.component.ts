import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private common: CommonService
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isSidebarOpen = true;
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  redirectTo(path: string) {
    this.common.redirectTo(path);
  }
  
    permissions(module: string, operation: string) {
    const result = this.common.checkpermission(module, operation);
    return result;
  }

}
