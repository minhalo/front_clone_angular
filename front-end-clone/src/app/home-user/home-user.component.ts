import { Component, OnInit } from '@angular/core';
import { tokenSelector } from '../state/auth/auth.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../model/appState.interface';
import * as formAction from '../state/auth/auth.actions';
import { Router } from '@angular/router';
import { AuthAPIService } from './../services/auth-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss'],
})
export class HomeUserComponent implements OnInit {
  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private AuthAPIService: AuthAPIService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
}
