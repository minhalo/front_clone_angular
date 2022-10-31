import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Login] Login',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Login] Login success',
  props<{
    errCode: Number;
    message: String | null;
    status: Number;
    token: String | null;
    name: String | null;
    role: String | null;
    coin: Number;
  }>()
);

export const loginFailure = createAction(
  '[Login] Login failed',
  props<{ error: string }>()
);

export const loginOut = createAction(
  '[Logout] Logout cd',
  props<{ token: string | null }>()
);

export const loginOutRefresh = createAction('[Logout] Logout');
