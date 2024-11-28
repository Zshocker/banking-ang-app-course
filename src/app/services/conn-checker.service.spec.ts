import { TestBed } from '@angular/core/testing';

import { ConnCheckerService } from './conn-checker.service';

describe('ConnCheckerService', () => {
  let service: ConnCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
