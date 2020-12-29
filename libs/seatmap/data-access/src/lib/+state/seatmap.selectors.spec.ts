import { SeatmapEntity } from './seatmap.models';
import { initialState, seatmapAdapter, SeatmapPartialState } from './seatmap.reducer';
import * as SeatmapSelectors from './seatmap.selectors';

describe('Seatmap Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSeatmapId = (it: SeatmapEntity) => it['id'];
  const createSeatmapEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SeatmapEntity);

  let state: SeatmapPartialState;

  beforeEach(() => {
    state = {
      seatmap: seatmapAdapter.setAll(
        [
          createSeatmapEntity('PRODUCT-AAA'),
          createSeatmapEntity('PRODUCT-BBB'),
          createSeatmapEntity('PRODUCT-CCC'),
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

  describe('Seatmap Selectors', () => {
    it('getAllSeatmap() should return the list of Seatmap', () => {
      const results = SeatmapSelectors.getAllSeatmap(state);
      const selId = getSeatmapId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SeatmapSelectors.getSelected(state) || { id: '' };
      const selId = getSeatmapId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSeatmapLoaded() should return the current loaded status', () => {
      const result = SeatmapSelectors.getSeatmapLoaded(state);

      expect(result).toBe(true);
    });

    it('getSeatmapError() should return the current error state', () => {
      const result = SeatmapSelectors.getSeatmapError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
