import { errSelector, mesSelector } from './../state/auth/auth.selector';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppStateInterface } from '../model/appState.interface';
import { nameSelector, tokenSelector } from '../state/auth/auth.selector';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

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
  check: boolean = true;
  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.token$ = this.store.pipe(select(tokenSelector));
    this.name$ = this.store.pipe(select(nameSelector));
    this.errMes$ = this.store.pipe(select(mesSelector));
    this.errCode$ = this.store.pipe(select(errSelector));
  }

  turn() {
    this.check = !this.check;
  }

  ngOnInit(): void {
    console.log(this.errMes$);
  }
  logout() {
    this.store.dispatch(
      formAction.loginOut({ token: localStorage.getItem('token') })
    );
    localStorage.clear();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal1(template1: TemplateRef<any>) {
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

  onSubmitReg() {}

  onSubmit() {
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
          this.modalRef?.hide();
          this.checkoutForm.reset();
        } else {
          localStorage.setItem('mes', x.login.message as string);
        }
      })
      .subscribe();
  }
}
