import { TestBed } from '@angular/core/testing';

import { PariodService } from './pariod.service';

describe('PariodService', () => {
  let service: PariodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PariodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
