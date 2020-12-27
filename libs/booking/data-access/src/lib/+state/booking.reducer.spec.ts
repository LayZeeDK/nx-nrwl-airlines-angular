import { BookingEntity } from './booking.models';
import * as BookingActions from './booking.actions';
import { State, initialState, reducer } from './booking.reducer';

describe('Booking Reducer', () => {
  const createBookingEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BookingEntity);

  beforeEach(() => {});

  describe('valid Booking actions', () => {
    it('loadBookingSuccess should return set the list of known Booking', () => {
      const booking = [
        createBookingEntity('PRODUCT-AAA'),
        createBookingEntity('PRODUCT-zzz'),
      ];
      const action = BookingActions.loadBookingSuccess({ booking });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
