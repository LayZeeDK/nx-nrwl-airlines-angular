import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKING_FEATURE_KEY,
  State,
  BookingPartialState,
  bookingAdapter,
} from './booking.reducer';

// Lookup the 'Booking' feature state managed by NgRx
export const getBookingState = createFeatureSelector<
  BookingPartialState,
  State
>(BOOKING_FEATURE_KEY);

const { selectAll, selectEntities } = bookingAdapter.getSelectors();

export const getBookingLoaded = createSelector(
  getBookingState,
  (state: State) => state.loaded
);

export const getBookingError = createSelector(
  getBookingState,
  (state: State) => state.error
);

export const getAllBooking = createSelector(getBookingState, (state: State) =>
  selectAll(state)
);

export const getBookingEntities = createSelector(
  getBookingState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getBookingState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBookingEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
