import { createAction, props } from '@ngrx/store';
import {User} from "../../interfaces/user";
import {SessionInfo} from "../../interfaces/sessionInfo";

export const loadAuthFromLocalStorage = createAction(
  '[Auth] load Auth FromLocal Storage',
  props<{ sessionInfo: SessionInfo }>()
);


export const login = createAction(
  '[Auth] login',
  props<{emailOrUserName: string, password: string}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ sessionInfo: SessionInfo }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{ payload: any }>()
);


export const logout = createAction(
  '[Auth] logout',
  props<{ payload: any }>()
);
