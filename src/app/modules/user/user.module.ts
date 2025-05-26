import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
import { AddRoleComponent } from './rolemanagement/add-role/add-role.component';
import { UserComponent } from './user.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AddUserComponent,
    DashboardComponent,
    UsermanagementComponent,
    RolemanagementComponent,
    AddRoleComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSidenavModule
  ]
})
export class UserModule { }
