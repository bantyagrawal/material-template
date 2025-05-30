import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonService } from 'src/app/core/services/common.service';

interface SidebarItem {
  name: string;
  icon?: string;
  redirectTo?: string;
  sublist?: SidebarItem[];
  permission?: {
    module: string;
    operation: string;
  };
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isHandset: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        this.isHandset = result.matches;
        return result.matches;
      }),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private common: CommonService
  ) {}

  sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      redirectTo: '/'
    },
    {
      name: 'User Management',
      icon: 'group',
      redirectTo: '/usermanagement',
      permission: { module: 'Users Management', operation: 'read' }
    },
    {
      name: 'Role Management',
      icon: 'admin_panel_settings',
      redirectTo: '/rolemanagement',
      permission: { module: 'Module Management', operation: 'read' }
    },
    {
      name: 'Level Management',
      icon: 'layers',
      redirectTo: '/levelmanagement'
    },
    {
      name: 'Module Management',
      icon: 'view_module',
      redirectTo: '/modulemanagement'
    },
    {
      name: 'Test Link',
      icon: 'link',
      sublist: [
              {
          name: 'Item1',
          redirectTo: '/testlink/item2'
        },
        {
          name: 'Item2',
          redirectTo: '/testlink/item2'
        },
                {
          name: 'Item3',
          redirectTo: '/testlink/item2'
        },
                {
          name: 'Item4',
          redirectTo: '/testlink/item2'
        },
      ]
    }
  ];

  redirectTo(path?: string) {
    if (path) {
      this.common.redirectTo(path);
    }
  }

  permissions(module: string, operation: string): boolean {
    return this.common.checkpermission(module, operation);
  }

  hasPermission(item: SidebarItem): boolean {
    if (!item.permission) return true;
    return this.permissions(item.permission.module, item.permission.operation);
  }
}
