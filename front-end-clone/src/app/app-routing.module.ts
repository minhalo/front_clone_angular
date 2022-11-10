import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { CatManageComponent } from './cat-manage/cat-manage.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { ManageComponent } from './manage/manage.component';
import { OtherComponent } from './other/other.component';
import { PropManageComponent } from './prop-manage/prop-manage.component';
import { UserMangerComponent } from './user-manger/user-manger.component';
import { HistoryUserComponent } from './user/history-user/history-user.component';
import { UserComponent } from './user/user.component';
import { AccountComponent } from './user/account/account.component';

const routes: Routes = [
  { path: '', component: HomeUserComponent },
  { path: 'product/:id', component: DetailProductComponent },
  { path: 'homeUser', component: HomeUserComponent },
  {
    path: 'me',
    component: UserComponent,
    children: [
      { path: '', component: HistoryUserComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
  { path: 'cart', component: CartComponentComponent },

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
