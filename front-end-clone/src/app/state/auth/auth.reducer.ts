import { createReducer, on } from '@ngrx/store';
import { login } from '../../model/auth';
import * as formAction from '../auth/auth.actions';

export const initialState: login = {
  ischeck: Boolean(localStorage.getItem('ischeck')),
  errCode: -1,
  message: '',
  status: Number(localStorage.getItem('status')),
  token: localStorage.getItem('token'),
  name: localStorage.getItem('name'),
  role: localStorage.getItem('role'),
  coin: Number(localStorage.getItem('coin')),
};

export const reducers = createReducer(
  initialState,
  on(formAction.loginRequest, (state) => ({ ...state, ischeck: true })),
  on(formAction.loginSuccess, (state, action) => ({
    ...state,
    ischeck: true,
    errCode: action.errCode,
    message: action.message,
    status: action.status,
    token: action.token,
    name: action.name,
    role: action.role,
    coin: action.coin,
  })),

  on(formAction.loginFailure, (state, action) => ({
    ...state,
    ischeck: false,
    error: action.error,
  })),
  on(formAction.loginOutRefresh, (state) => ({
    ...state,
    ischeck: false,
    errCode: -1,
    message: '',
    status: -1,
    token: null,
    role: null,
    coin: 0,
  })),

  on(formAction.updateRequest, (state, action) => ({
    ...state,
    coin: action.coin,
  }))
);
