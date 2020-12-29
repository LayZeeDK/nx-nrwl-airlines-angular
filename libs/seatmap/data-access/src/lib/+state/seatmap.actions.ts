import { createAction, props } from '@ngrx/store';

import { SeatmapEntity } from './seatmap.models';

export const init = createAction('[Seatmap Page] Init');

export const loadSeatmapSuccess = createAction(
  '[Seatmap/API] Load Seatmap Success',
  props<{ seatmap: SeatmapEntity[] }>()
);

export const loadSeatmapFailure = createAction(
  '[Seatmap/API] Load Seatmap Failure',
  props<{ error: string }>()
);
