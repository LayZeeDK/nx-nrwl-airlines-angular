import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SeatmapEffects } from './seatmap.effects';
import * as SeatmapActions from './seatmap.actions';

describe('SeatmapEffects', () => {
  let actions: Observable<any>;
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
