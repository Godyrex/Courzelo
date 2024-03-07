import {TestBed} from '@angular/core/testing';

import {NonDisponibilityService} from './non-disponibility.service';

describe('NonDisponibilityService', () => {
  let service: NonDisponibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonDisponibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
