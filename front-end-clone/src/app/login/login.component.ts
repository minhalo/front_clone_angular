import { login } from './../model/auth';
import { AuthAPIService } from './../services/auth-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import * as formAction from '../state/auth/auth.actions'
import { AppStateInterface } from '../model/appState.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private AuthAPIService: AuthAPIService, private store: Store<AppStateInterface>, private formBuilder: FormBuilder,private router:Router) {}

  ngOnInit(): void {

  }

  checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

   onSubmit() {
    this.store.dispatch(formAction.loginRequest({email: this.checkoutForm.value.email as string, password: this.checkoutForm.value.password as string}))
    this.store.select(x => {
      if(x.login.errCode == 0){
        localStorage.setItem('token', x.login.token as string);
        this.router.navigate(['homeUser'])
      }
      }).subscribe()
  }
}
