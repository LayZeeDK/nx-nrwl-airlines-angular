import * as CheckInActions from './check-in.actions';
import { CheckInEntity } from './check-in.models';
import { initialState, reducer, State } from './check-in.reducer';

describe('CheckIn Reducer', () => {
  const createCheckInEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CheckInEntity);

  describe('valid CheckIn actions', () => {
    it('loadCheckInSuccess should return set the list of known CheckIn', () => {
      const checkIn = [
        createCheckInEntity('PRODUCT-AAA'),
        createCheckInEntity('PRODUCT-zzz'),
      ];
      const action = CheckInActions.loadCheckInSuccess({ checkIn });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {};

      // @ts-expect-error Unknown action
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
