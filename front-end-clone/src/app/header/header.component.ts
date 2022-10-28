import {
  errSelector,
  mesSelector,
  isLoadingSelector,
} from './../state/auth/auth.selector';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppStateInterface } from '../model/appState.interface';
import { nameSelector, tokenSelector } from '../state/auth/auth.selector';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { AuthAPIService } from '../services/auth-api.service';

import * as formAction from '../state/auth/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  modalRef?: BsModalRef;
  token$: Observable<String | null>;
  name$: Observable<String | null>;
  errMes$: Observable<String | null>;
  errCode$: Observable<Number | null>;
  errMes: String | null = localStorage.getItem('mes');
  ischeck$: Observable<Boolean>;
  isCheckLogin: boolean = false;
  isCheckLogout: boolean = false;
  isCheckRegister: boolean = false;
  isloading: boolean = false;

  errReg: Number = -1;
  errMessageReg: string = '';
  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private AuthAPIService: AuthAPIService
  ) {
    this.token$ = this.store.pipe(select(tokenSelector));
    this.name$ = this.store.pipe(select(nameSelector));
    this.errMes$ = this.store.pipe(select(mesSelector));
    this.errCode$ = this.store.pipe(select(errSelector));
    this.ischeck$ = this.store.pipe(select(isLoadingSelector));
  }

  ngOnInit(): void {
    console.log(this.errMes$);
  }
  logout() {
    this.isloading = false;
    this.isCheckLogin = false;
    this.isCheckLogout = true;
    this.store.dispatch(
      formAction.loginOut({ token: localStorage.getItem('token') })
    );
    localStorage.clear();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal1(template1: TemplateRef<any>) {
    this.isCheckRegister = false;
    this.modalRef = this.modalService.show(template1);
  }
  checkoutForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  checkoutFormReg = this.formBuilder.group({
    email: '',
    password: '',
    cpassword: '',
  });

  onSubmitReg() {
    setTimeout(() => {
      this.isCheckRegister = true;
    }, 5000);

    this.AuthAPIService.register(
      this.checkoutFormReg.value.email as string,
      this.checkoutFormReg.value.password as string,
      this.checkoutFormReg.value.cpassword as string
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessageReg = response.message;
      if (response.errCode == 0) {
        setTimeout(() => {
          this.checkoutFormReg.reset();
          this.modalRef?.hide();
        }, 4000);
      }
    });
  }

  onSubmit() {
    this.isloading = true;
    setTimeout(() => {
      this.isCheckLogout = false;
      this.isCheckLogin = true;
    }, 5000);

    this.store.dispatch(
      formAction.loginRequest({
        email: this.checkoutForm.value.email as string,
        password: this.checkoutForm.value.password as string,
      })
    );
    this.store
      .select((x) => {
        if (x.login.errCode == 0) {
          localStorage.setItem('token', x.login.token as string);
          localStorage.setItem('name', x.login.name as string);
          localStorage.setItem('ischeck', 'true');
          setTimeout(() => {
            this.modalRef?.hide();
            this.checkoutForm.reset();
          }, 4000);
        } else {
          localStorage.setItem('mes', x.login.message as string);
        }
      })
      .subscribe();
  }
}
