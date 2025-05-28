import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  data:any
constructor(private profile:CommonService){
   this.data=profile.permissions;
  
}

  user = {
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'John Doe'
  };
}
