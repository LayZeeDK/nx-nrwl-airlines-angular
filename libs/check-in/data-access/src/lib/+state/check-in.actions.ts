import { createAction, props } from '@ngrx/store';

import { CheckInEntity } from './check-in.models';

export const init = createAction('[CheckIn Page] Init');

export const loadCheckInSuccess = createAction(
  '[CheckIn/API] Load CheckIn Success',
  props<{ checkIn: CheckInEntity[] }>()
);

export const loadCheckInFailure = createAction(
  '[CheckIn/API] Load CheckIn Failure',
  props<{ error: string }>()
);
