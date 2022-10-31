import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from './../services/auth-api.service';
import { cate } from '../model/cate';
import { Observable } from 'rxjs';
import { roleSelector } from './../state/auth/auth.selector';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../model/appState.interface';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss'],
})
export class LeftbarComponent implements OnInit {
  categot: cate[] = [];
  role$: Observable<String | null>;
  constructor(
    private AuthAPIService: AuthAPIService,
    private store: Store<AppStateInterface>
  ) {
    this.role$ = this.store.pipe(select(roleSelector));
  }

  ngOnInit(): void {
    this.AuthAPIService.category().subscribe((response) => {
      this.categot = response;
    });
  }
}
