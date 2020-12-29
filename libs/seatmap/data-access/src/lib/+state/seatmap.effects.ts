import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as SeatmapActions from './seatmap.actions';

@Injectable()
export class SeatmapEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeatmapActions.init),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SeatmapActions.loadSeatmapSuccess({ seatmap: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return SeatmapActions.loadSeatmapFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
