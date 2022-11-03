import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './home-user/home-user.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { OtherComponent } from './other/other.component';
import { UserMangerComponent } from './user-manger/user-manger.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeUserComponent },
  { path: 'homeUser', component: HomeUserComponent },
  { path: 'me', component: UserComponent },
  {
    path: 'manage',
    component: UserMangerComponent,
    children: [
      {
        path: '',
        component: ManageComponent,
      },
      {
        path: 'other',
        component: OtherComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
