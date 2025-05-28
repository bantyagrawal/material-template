import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/user/user.module').then(a => a.UserModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(a => a.AdminModule) },
  { path: 'login', loadChildren: () => import('./modules/authentication/authentication.module').then(a => a.AuthenticationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
