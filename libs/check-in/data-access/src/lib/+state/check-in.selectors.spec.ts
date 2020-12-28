import { CheckInEntity } from './check-in.models';
import { State, checkInAdapter, initialState } from './check-in.reducer';
import * as CheckInSelectors from './check-in.selectors';

describe('CheckIn Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCheckInId = (it) => it['id'];
  const createCheckInEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CheckInEntity);

  let state;

  beforeEach(() => {
    state = {
      checkIn: checkInAdapter.setAll(
        [
          createCheckInEntity('PRODUCT-AAA'),
          createCheckInEntity('PRODUCT-BBB'),
          createCheckInEntity('PRODUCT-CCC'),
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

  describe('CheckIn Selectors', () => {
    it('getAllCheckIn() should return the list of CheckIn', () => {
      const results = CheckInSelectors.getAllCheckIn(state);
      const selId = getCheckInId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CheckInSelectors.getSelected(state);
      const selId = getCheckInId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCheckInLoaded() should return the current 'loaded' status", () => {
      const result = CheckInSelectors.getCheckInLoaded(state);

      expect(result).toBe(true);
    });

    it("getCheckInError() should return the current 'error' state", () => {
      const result = CheckInSelectors.getCheckInError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
