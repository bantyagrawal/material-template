import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user = {
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'John Doe'
  };
}
