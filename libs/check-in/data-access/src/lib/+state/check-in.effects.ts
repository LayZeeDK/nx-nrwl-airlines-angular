import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CheckInActions from './check-in.actions';

@Injectable()
export class CheckInEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckInActions.init),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CheckInActions.loadCheckInSuccess({ checkIn: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return CheckInActions.loadCheckInFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
