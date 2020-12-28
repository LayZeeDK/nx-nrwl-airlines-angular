import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CHECK_IN_FEATURE_KEY, checkInAdapter, CheckInPartialState, State } from './check-in.reducer';

// Lookup the 'CheckIn' feature state managed by NgRx
export const getCheckInState = createFeatureSelector<
  CheckInPartialState,
  State
>(CHECK_IN_FEATURE_KEY);

const { selectAll, selectEntities } = checkInAdapter.getSelectors();

export const getCheckInLoaded = createSelector(
  getCheckInState,
  (state: State) => state.loaded
);

export const getCheckInError = createSelector(
  getCheckInState,
  (state: State) => state.error
);

export const getAllCheckIn = createSelector(getCheckInState, (state: State) =>
  selectAll(state)
);

export const getCheckInEntities = createSelector(
  getCheckInState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCheckInState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCheckInEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
