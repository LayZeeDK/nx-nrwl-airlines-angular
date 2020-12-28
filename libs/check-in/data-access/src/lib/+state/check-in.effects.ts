import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CheckInFeature from './check-in.reducer';
import * as CheckInActions from './check-in.actions';

@Injectable()
export class CheckInEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckInActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CheckInActions.loadCheckInSuccess({ checkIn: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CheckInActions.loadCheckInFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
