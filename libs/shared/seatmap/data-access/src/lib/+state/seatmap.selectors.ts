import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SEATMAP_FEATURE_KEY,
  State,
  SeatmapPartialState,
  seatmapAdapter,
} from './seatmap.reducer';

// Lookup the 'Seatmap' feature state managed by NgRx
export const getSeatmapState = createFeatureSelector<
  SeatmapPartialState,
  State
>(SEATMAP_FEATURE_KEY);

const { selectAll, selectEntities } = seatmapAdapter.getSelectors();

export const getSeatmapLoaded = createSelector(
  getSeatmapState,
  (state: State) => state.loaded
);

export const getSeatmapError = createSelector(
  getSeatmapState,
  (state: State) => state.error
);

export const getAllSeatmap = createSelector(getSeatmapState, (state: State) =>
  selectAll(state)
);

export const getSeatmapEntities = createSelector(
  getSeatmapState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSeatmapState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSeatmapEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
