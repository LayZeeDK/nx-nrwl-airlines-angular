import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as SeatmapActions from './seatmap.actions';
import { SeatmapEffects } from './seatmap.effects';

describe('SeatmapEffects', () => {
  let actions: Observable<unknown>;
  let effects: SeatmapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SeatmapEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(SeatmapEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SeatmapActions.init() });

      const expected = hot('-a-|', {
        a: SeatmapActions.loadSeatmapSuccess({ seatmap: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
