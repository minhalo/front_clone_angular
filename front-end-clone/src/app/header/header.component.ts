import {
  errSelector,
  mesSelector,
  roleSelector,
  isLoadingSelector,
  coinSelector,
} from './../state/auth/auth.selector';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppStateInterface } from '../model/appState.interface';
import { badge, badged } from '../model/other';
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
  coin: number = Number(localStorage.getItem('coin'));

  modalRef?: BsModalRef;
  token$: Observable<String | null>;
  name$: Observable<String | null>;
  errMes$: Observable<String | null>;
  errCode$: Observable<Number | null>;
  errMes: String | null = localStorage.getItem('mes');
  ischeck$: Observable<Boolean>;
  badge: number = 0;
  idchecklogin: boolean = false;
  idchecklogout: boolean = false;
  idcheckreg: boolean = false;

  errReg: Number = -1;
  errMessageReg: string = '';
  role$: Observable<String | null>;
  coin$: Observable<number>;

  constructor(
    private store: Store<AppStateInterface>,
    private stored: Store<badged>,
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
    this.role$ = this.store.pipe(select(roleSelector));
    this.coin$ = this.store.pipe(select(coinSelector));
  }

  profile() {
    this.router.navigate(['/me']);
  }

  cart() {
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.AuthAPIService.bad(localStorage.getItem('token')).subscribe(
        (response) => {
          this.badge = response;
        }
      );
    }
  }

  logout() {
    this.idchecklogout = true;
    setTimeout(() => {
      this.idchecklogout = false;
    }, 5000);
    this.store.dispatch(
      formAction.loginOut({ token: localStorage.getItem('token') })
    );
    localStorage.clear();
    this.router.navigate(['']);
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

  demoadmin() {
    this.checkoutForm.reset({
      email: 'admin@gmail.com',
      password: 'Minlvip123!',
    });
  }

  demouser() {
    this.checkoutForm.reset({
      email: 'duongdoican@gmail.com',
      password: 'Minlvip123!',
    });
  }

  onSubmitReg() {
    this.idcheckreg = true;
    setTimeout(() => {
      this.idcheckreg = false;
    }, 5000);
    this.AuthAPIService.register(
      this.checkoutFormReg.value.email as string,
      this.checkoutFormReg.value.password as string,
      this.checkoutFormReg.value.cpassword as string
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessageReg = response.message;
      if (response.errCode == 0) {
        this.checkoutFormReg.reset();
        this.modalRef?.hide();
      }
    });
  }

  onSubmit() {
    this.idchecklogin = true;
    setTimeout(() => {
      this.idchecklogin = false;
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
          localStorage.setItem('role', x.login.role as string);
          localStorage.setItem('ischeck', 'true');
          localStorage.setItem('coin', String(x.login.coin));
          localStorage.setItem('status', String(x.login.status));

          this.modalRef?.hide();
          this.checkoutForm.reset();
        } else {
          localStorage.setItem('mes', x.login.message as string);
        }
      })
      .subscribe();
  }
}
