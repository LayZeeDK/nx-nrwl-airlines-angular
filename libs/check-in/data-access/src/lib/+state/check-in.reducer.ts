import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CheckInActions from './check-in.actions';
import { CheckInEntity } from './check-in.models';

export const CHECK_IN_FEATURE_KEY = 'checkIn';

export interface State extends EntityState<CheckInEntity> {
  selectedId?: string | number; // which CheckIn record has been selected
  loaded: boolean; // has the CheckIn list been loaded
  error?: string | null; // last known error (if any)
}

export interface CheckInPartialState {
  readonly [CHECK_IN_FEATURE_KEY]: State;
}

export const checkInAdapter: EntityAdapter<CheckInEntity> = createEntityAdapter<
  CheckInEntity
>();

export const initialState: State = checkInAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const checkInReducer = createReducer(
  initialState,
  on(CheckInActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CheckInActions.loadCheckInSuccess, (state, { checkIn }) =>
    checkInAdapter.setAll(checkIn, { ...state, loaded: true })
  ),
  on(CheckInActions.loadCheckInFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return checkInReducer(state, action);
}
