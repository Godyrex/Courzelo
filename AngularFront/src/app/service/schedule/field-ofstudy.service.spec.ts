import {TestBed} from '@angular/core/testing';

import {FieldOfstudyService} from './field-ofstudy.service';

describe('FieldOfstudyService', () => {
  let service: FieldOfstudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldOfstudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
