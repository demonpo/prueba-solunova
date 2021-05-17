import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';
import {User} from "../../interfaces/user";


export interface UserState {
    id     : string,
    user   : User,
    loaded : boolean,
    loading: boolean,
    error  : any
}

export const UserInitialState: UserState = {
  // @ts-ignore
    id     : null,
  // @ts-ignore
    user   : null,
    loaded : false,
    loading: false,
    error  : null
}

const _UsuarioReducer = createReducer( UserInitialState,

    on( cargarUsuario, (state, { id }) => ({
        ...state,
        loading: true,
        id: id
    })),


    on( cargarUsuarioSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: { ...user }
    })),

    on( cargarUsuarioError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),




);

export function UserReducer(state: any, action: any) {
    return _UsuarioReducer(state, action);
}
