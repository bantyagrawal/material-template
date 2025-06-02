import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private common: CommonService,
    private router: Router
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        this.isHandset = result.matches;
        return result.matches;
      }),
      shareReplay()
    );

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
          icon: 'dashboard',
          redirectTo: '/testlink/item1',
          sublist: [
            { name: "levels", icon: "layers", redirectTo: "/usermanagement" },
            { name: "level2", icon: "stairs", redirectTo: "/testlink/item1/level2" }
          ]
        },
        {
          name: 'Item2',
          icon: 'dashboard',
          redirectTo: '/testlink/item2'
        },
        {
          name: 'Item3',
          icon: 'dashboard',
          redirectTo: '/testlink/item3'
        },
      ]
    },
  ];

  redirectTo(path?: string) {
    if (path) {
      this.common.redirectTo(path);
    }
  }

  isActive(path?: string): boolean {
    if (!path) return false;
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }

  permissions(module: string, operation: string): boolean {
    return this.common.checkpermission(module, operation);
  }

  hasPermission(item: SidebarItem): boolean {
    if (!item.permission) return true;
    return this.permissions(item.permission.module, item.permission.operation);
  }

isExpandableActive(item: SidebarItem): boolean {
  if (!item.sublist) return false;
  return item.sublist.some((child: SidebarItem) => this.isActive(child.redirectTo));
}


}
