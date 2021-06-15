import { TestBed } from '@angular/core/testing';

import { EditUserGuard } from './edit-user.guard';

describe('EditUserGuard', () => {
  let guard: EditUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
