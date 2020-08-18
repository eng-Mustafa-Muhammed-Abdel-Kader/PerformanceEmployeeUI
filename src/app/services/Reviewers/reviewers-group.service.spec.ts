import { TestBed } from '@angular/core/testing';

import { ReviewersGroupService } from './reviewers-group.service';

describe('ReviewersGroupService', () => {
  let service: ReviewersGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewersGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
