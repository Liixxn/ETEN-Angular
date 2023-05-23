import { TestBed } from '@angular/core/testing';

import { SubscripcionGuard } from './subscripcion.guard';

describe('SubscripcionGuard', () => {
  let guard: SubscripcionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubscripcionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
