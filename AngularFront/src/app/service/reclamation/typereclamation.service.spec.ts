import { TestBed } from '@angular/core/testing';
import { TypereclamationService } from './typereclamation.service';

describe('TypereclamationService', () => {
  let service: TypereclamationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypereclamationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
