import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  data:any
constructor(private profile:CommonService ,  private apiService:ApiService){
   this.data=profile.permissions;
  
}

  user = {
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'John Doe'
  };
  redirectTo(path: string) {
    this.profile.redirectTo(path);
  }

  logout() {
    this.apiService.logOut().subscribe((res: any) => {
      this.redirectTo('login');
    });
  }
  redirectFromPageHeader(data: string) {
    if (data === 'Home') {
      this.profile.redirectTo('user');
    }
  }
}
