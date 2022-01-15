import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface LoadingState {
  isLoading: boolean;
}

export const initialState: LoadingState = {
  isLoading: false,
};

const _uiReducer = createReducer(
  initialState,
  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false }))
);

export function uiReducer(state: LoadingState | undefined, action: Action) {
  return _uiReducer(state, action);
}
