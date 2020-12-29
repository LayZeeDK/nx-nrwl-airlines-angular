import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as BookingActions from './booking.actions';
import { BookingEffects } from './booking.effects';

describe('BookingEffects', () => {
  let actions: Observable<unknown>;
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
