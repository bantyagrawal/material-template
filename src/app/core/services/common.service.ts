import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  permissions: any = null;

  constructor(
    private route: Router,
    private api: ApiService
  ) { }

  redirectTo(path: string) {
    this.route.navigateByUrl(path);
  }

  assignPermission(currentUrl: string = ''): Promise<void> {
    if (currentUrl === 'login') {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      if (this.permissions) {
        resolve();
        return;
      }
      this.api.loggedInUser().subscribe({
        next: (res: any) => {
          this.permissions = res.data;
          resolve();
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  checkpermission(module: string, operation: string): boolean {    
    const modulePermission = this.permissions?.RoleModulePermissions.find(
      (perm: any) => perm.module.name.trim() === module
    );
    const result = modulePermission?.permission?.[operation] ?? false;
    return result;
  }

  checkUpdatePermission(module: string) {
    return this.checkpermission(module, 'write');
  }

    checkDeletePermission(module: string) {
    return this.checkpermission(module, 'delete');
  }

}
