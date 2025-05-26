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
    private api:ApiService  
  ) { }

  redirectTo(path: string) {
    this.route.navigateByUrl(path);
  }

  assignPermission(): Promise<void> {
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

}
