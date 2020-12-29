import * as SeatmapActions from './seatmap.actions';
import { SeatmapEntity } from './seatmap.models';
import { initialState, reducer, State } from './seatmap.reducer';

describe('Seatmap Reducer', () => {
  const createSeatmapEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SeatmapEntity);

  describe('valid Seatmap actions', () => {
    it('loadSeatmapSuccess should return set the list of known Seatmap', () => {
      const seatmap = [
        createSeatmapEntity('PRODUCT-AAA'),
        createSeatmapEntity('PRODUCT-zzz'),
      ];
      const action = SeatmapActions.loadSeatmapSuccess({ seatmap });

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
