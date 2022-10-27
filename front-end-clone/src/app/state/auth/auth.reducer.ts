import { createReducer, on } from '@ngrx/store';
import { login } from '../../model/auth';
import * as formAction from '../auth/auth.actions';

export const initialState: login = {
  ischeck: false,
  errCode: -1,
  message: '',
  status: -1,
  token: localStorage.getItem('token'),
  name: localStorage.getItem('name'),
};

export const reducers = createReducer(
  initialState,
  on(formAction.loginRequest, (state) => ({ ...state, ischeck: true })),
  on(formAction.loginSuccess, (state, action) => ({
    ...state,
    ischeck: false,
    errCode: action.errCode,
    message: action.message,
    status: action.status,
    token: action.token,
    name: action.name,
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
  }))
);
