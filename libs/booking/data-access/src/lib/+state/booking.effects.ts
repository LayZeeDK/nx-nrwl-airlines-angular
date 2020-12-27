import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as BookingFeature from './booking.reducer';
import * as BookingActions from './booking.actions';

@Injectable()
export class BookingEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return BookingActions.loadBookingSuccess({ booking: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return BookingActions.loadBookingFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
