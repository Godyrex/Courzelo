/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {SharedDataService} from './shared-data.service';

describe('Service: SharedData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedDataService]
    });
  });

  it('should ...', inject([SharedDataService], (service: SharedDataService) => {
    expect(service).toBeTruthy();
  }));
});
