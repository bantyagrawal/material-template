import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';

const routes: Routes = [
      { path: '', loadChildren: () => import('./modules/authentication/authentication.module').then(a => a.AuthenticationModule) },
  // { path: '', loadChildren: () => import('./modules/user/user.module').then(a => a.UserModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(a => a.AdminModule) },
  { path: 'profile', component: UserProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
