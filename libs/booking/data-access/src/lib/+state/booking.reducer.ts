import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BookingActions from './booking.actions';
import { BookingEntity } from './booking.models';

export const BOOKING_FEATURE_KEY = 'booking';

export interface State extends EntityState<BookingEntity> {
  selectedId?: string | number; // which Booking record has been selected
  loaded: boolean; // has the Booking list been loaded
  error?: string | null; // last known error (if any)
}

export interface BookingPartialState {
  readonly [BOOKING_FEATURE_KEY]: State;
}

export const bookingAdapter: EntityAdapter<BookingEntity> = createEntityAdapter<
  BookingEntity
>();

export const initialState: State = bookingAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const bookingReducer = createReducer(
  initialState,
  on(BookingActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BookingActions.loadBookingSuccess, (state, { booking }) =>
    bookingAdapter.setAll(booking, { ...state, loaded: true })
  ),
  on(BookingActions.loadBookingFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return bookingReducer(state, action);
}
