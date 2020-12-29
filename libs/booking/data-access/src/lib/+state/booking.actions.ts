import { createAction, props } from '@ngrx/store';

import { BookingEntity } from './booking.models';

export const init = createAction('[Booking Page] Init');

export const loadBookingSuccess = createAction(
  '[Booking/API] Load Booking Success',
  props<{ booking: BookingEntity[] }>()
);

export const loadBookingFailure = createAction(
  '[Booking/API] Load Booking Failure',
  props<{ error: string }>()
);
