import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SeatmapActions from './seatmap.actions';
import { SeatmapEntity } from './seatmap.models';

export const SEATMAP_FEATURE_KEY = 'seatmap';

export interface State extends EntityState<SeatmapEntity> {
  selectedId?: string | number; // which Seatmap record has been selected
  loaded: boolean; // has the Seatmap list been loaded
  error?: string | null; // last known error (if any)
}

export interface SeatmapPartialState {
  readonly [SEATMAP_FEATURE_KEY]: State;
}

export const seatmapAdapter: EntityAdapter<SeatmapEntity> = createEntityAdapter<
  SeatmapEntity
>();

export const initialState: State = seatmapAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const seatmapReducer = createReducer(
  initialState,
  on(SeatmapActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SeatmapActions.loadSeatmapSuccess, (state, { seatmap }) =>
    seatmapAdapter.setAll(seatmap, { ...state, loaded: true })
  ),
  on(SeatmapActions.loadSeatmapFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return seatmapReducer(state, action);
}
