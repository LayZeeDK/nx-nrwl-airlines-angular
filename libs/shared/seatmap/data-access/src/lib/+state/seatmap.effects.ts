import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as SeatmapFeature from './seatmap.reducer';
import * as SeatmapActions from './seatmap.actions';

@Injectable()
export class SeatmapEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeatmapActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SeatmapActions.loadSeatmapSuccess({ seatmap: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SeatmapActions.loadSeatmapFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
