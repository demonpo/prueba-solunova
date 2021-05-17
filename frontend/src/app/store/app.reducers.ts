import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
  user: reducers.UserState,
  auth: reducers.AuthState
}



export const appReducers: ActionReducerMap<AppState> = {
  user: reducers.UserReducer,
  auth: reducers.AuthReducer
}
