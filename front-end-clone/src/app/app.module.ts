import { authEffects, outEffects } from './state/auth/auth.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/auth/auth.reducer';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  RichTextEditorModule,
  ToolbarService,
  HtmlEditorService,
  LinkService,
  ImageService,
} from '@syncfusion/ej2-angular-richtexteditor';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserComponent } from './user/user.component';
import { UserMangerComponent } from './user-manger/user-manger.component';
import { ManageComponent } from './manage/manage.component';
import { OtherComponent } from './other/other.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { PropManageComponent } from './prop-manage/prop-manage.component';
import { CatManageComponent } from './cat-manage/cat-manage.component';
import { ModelPropComponent } from './prop-manage/model-prop/model-prop.component';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { HistoryUserComponent } from './user/history-user/history-user.component';
import { AccountComponent } from './user/account/account.component';
import { ErrComponentComponent } from './err-component/err-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUserComponent,
    HomeAdminComponent,
    HeaderComponent,
    FooterComponent,
    LeftbarComponent,
    RightbarComponent,
    UserComponent,
    UserMangerComponent,
    ManageComponent,
    OtherComponent,
    DetailProductComponent,
    PropManageComponent,
    CatManageComponent,
    ModelPropComponent,
    CartComponentComponent,
    HistoryUserComponent,
    AccountComponent,
    ErrComponentComponent,
  ],
  imports: [
    RichTextEditorModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('login', reducers),
    EffectsModule.forRoot([authEffects, outEffects]),
    StoreModule.forRoot({}),
  ],
  providers: [ToolbarService, HtmlEditorService, LinkService, ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
