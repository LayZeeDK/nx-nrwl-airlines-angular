import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CheckInEffects } from './check-in.effects';
import * as CheckInActions from './check-in.actions';

describe('CheckInEffects', () => {
  let actions: Observable<any>;
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
