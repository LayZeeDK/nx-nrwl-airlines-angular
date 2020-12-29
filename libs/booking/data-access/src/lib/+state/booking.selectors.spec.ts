import { BookingEntity } from './booking.models';
import { bookingAdapter, BookingPartialState, initialState } from './booking.reducer';
import * as BookingSelectors from './booking.selectors';

describe('Booking Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBookingId = (it: BookingEntity) => it['id'];
  const createBookingEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BookingEntity);

  let state: BookingPartialState;

  beforeEach(() => {
    state = {
      booking: bookingAdapter.setAll(
        [
          createBookingEntity('PRODUCT-AAA'),
          createBookingEntity('PRODUCT-BBB'),
          createBookingEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Booking Selectors', () => {
    it('getAllBooking() should return the list of Booking', () => {
      const results = BookingSelectors.getAllBooking(state);
      const selId = getBookingId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BookingSelectors.getSelected(state) || { id: '' };
      const selId = getBookingId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getBookingLoaded() should return the current loaded status', () => {
      const result = BookingSelectors.getBookingLoaded(state);

      expect(result).toBe(true);
    });

    it('getBookingError() should return the current error state', () => {
      const result = BookingSelectors.getBookingError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
