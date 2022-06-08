import { TestBed } from '@angular/core/testing';

import { PersonalestudiosformService } from './personalestudiosform.service';

describe('PersonalestudiosformService', () => {
  let service: PersonalestudiosformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalestudiosformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
