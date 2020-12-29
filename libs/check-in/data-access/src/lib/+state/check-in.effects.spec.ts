import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CheckInActions from './check-in.actions';
import { CheckInEffects } from './check-in.effects';

describe('CheckInEffects', () => {
  let actions: Observable<unknown>;
  let effects: CheckInEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CheckInEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CheckInEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CheckInActions.init() });

      const expected = hot('-a-|', {
        a: CheckInActions.loadCheckInSuccess({ checkIn: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
