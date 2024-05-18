import { TestBed } from '@angular/core/testing';

import { ReclamationtypeService } from './reclamationtype.service';

describe('ReclamationtypeService', () => {
  let service: ReclamationtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
