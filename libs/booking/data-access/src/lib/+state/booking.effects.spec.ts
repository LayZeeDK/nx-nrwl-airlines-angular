import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BookingEffects } from './booking.effects';
import * as BookingActions from './booking.actions';

describe('BookingEffects', () => {
  let actions: Observable<any>;
  let effects: BookingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BookingEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(BookingEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BookingActions.init() });

      const expected = hot('-a-|', {
        a: BookingActions.loadBookingSuccess({ booking: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
