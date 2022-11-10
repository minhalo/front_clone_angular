import { AuthAPIService } from './../../services/auth-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import * as formAction from '../../state/auth/auth.actions';

@Injectable()
export class authEffects {
  getPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(formAction.loginRequest),
      mergeMap((action) => {
        return this.AuthAPIService.account(action.email, action.password).pipe(
          map((user) => formAction.loginSuccess(user))
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private AuthAPIService: AuthAPIService
  ) {}
}

@Injectable()
export class outEffects {
  getPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(formAction.loginOut),
      mergeMap((action) => {
        return this.AuthAPIService.logout(action.token).pipe(
          map((user) => formAction.loginOutRefresh())
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private AuthAPIService: AuthAPIService
  ) {}
}
