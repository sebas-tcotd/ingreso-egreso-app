import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import * as actions from './auth.actions';

export interface UserState {
  user: Usuario | null;
}

export const initialState: UserState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(actions.unsetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: UserState | undefined, action: Action) {
  return _authReducer(state, action);
}
