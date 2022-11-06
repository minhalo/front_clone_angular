import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatManageComponent } from './cat-manage/cat-manage.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { OtherComponent } from './other/other.component';
import { PropManageComponent } from './prop-manage/prop-manage.component';
import { UserMangerComponent } from './user-manger/user-manger.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'product/:id', component: DetailProductComponent },
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
      {
        path: 'product',
        component: PropManageComponent,
      },
      {
        path: 'category',
        component: CatManageComponent,
      },
    ],
  },
  { path: '', component: HomeUserComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
