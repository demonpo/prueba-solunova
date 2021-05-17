import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  loadAuthFromLocalStorage
} from '../actions';
import {SessionInfo} from "../../interfaces/sessionInfo";


export interface AuthState {
    sessionInfo: SessionInfo,
    loaded : boolean,
    loading: boolean,
    error  : any
}

export const AuthInitialState: AuthState = {
  // @ts-ignore
    sessionInfo : null,
    loaded : false,
    loading: false,
    error  : null
}

// @ts-ignore
const _AuthReducer = createReducer( AuthInitialState,

    on( loadAuthFromLocalStorage, (state, { sessionInfo }) => {
      return ({...AuthInitialState, sessionInfo})
    }),

    on( login, (state, { emailOrUserName, password }) => ({
        ...state,
        loading: true,
    })),


    on( loginSuccess, (state, { sessionInfo }) => ({
        ...state,
        loading: false,
        loaded: true,
        sessionInfo: { ...sessionInfo }
    })),

    on( loginError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),


  on( logout, (state, { payload }) => ({...AuthInitialState})),





);

export function AuthReducer(state: any, action: any) {
    return _AuthReducer(state, action);
}
