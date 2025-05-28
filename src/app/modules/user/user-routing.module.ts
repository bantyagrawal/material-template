import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './usermanagement/add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
import { AddRoleComponent } from './rolemanagement/add-role/add-role.component';
import { UserComponent } from './user.component';
import { LevelmanagementComponent } from './levelmanagement/levelmanagement.component';
import { ModulemanagementComponent } from './modulemanagement/modulemanagement.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: DashboardComponent },
      { path: 'userform', component: AddUserComponent },
      { path: 'usermanagement', component: UsermanagementComponent },
      { path: 'rolemanagement', component: RolemanagementComponent },
      { path: 'levelmanagement', component: LevelmanagementComponent },
      { path: 'modulemanagement', component: ModulemanagementComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'roleform', component: AddRoleComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
