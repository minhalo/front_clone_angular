import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './home-user/home-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeUserComponent },
  { path: 'homeUser', component: HomeUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
