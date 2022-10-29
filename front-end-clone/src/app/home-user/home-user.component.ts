import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../model/appState.interface';
import { Router } from '@angular/router';
import { AuthAPIService } from './../services/auth-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss'],
})
export class HomeUserComponent implements OnInit {
  element: HTMLElement;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private AuthAPIService: AuthAPIService,
    private formBuilder: FormBuilder
  ) {
    this.element = document.getElementById('mydov') as HTMLElement;
  }

  ngOnInit(): void {
    this.element = document.getElementById('mydov') as HTMLElement;
  }
}
