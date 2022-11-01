import { profile } from './../model/profile';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../model/appState.interface';
import { roleSelector } from './../state/auth/auth.selector';
import { Observable } from 'rxjs';
import { AuthAPIService } from '../services/auth-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  name: string = '';
  age: number | null = 0;
  image: number = 0;
  gender: string = '';
  address: string = '';
  gmail: string | null = '';
  role$: Observable<String | null>;
  coin: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>,
    private AuthAPIService: AuthAPIService
  ) {
    this.role$ = this.store.pipe(select(roleSelector));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {});

    this.AuthAPIService.profile(localStorage.getItem('token')).subscribe(
      (response: profile) => {
        this.name = response.name;
        this.age = response.age;
        this.image = response.image;
        this.gender = response.GenderId;
        this.address = response.AddressId;
        this.gmail = response.gmail;
        this.coin = response.coin;
      }
    );
  }
}
