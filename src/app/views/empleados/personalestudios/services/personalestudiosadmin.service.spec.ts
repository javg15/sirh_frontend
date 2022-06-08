import { TestBed } from '@angular/core/testing';

import { PersonalestudiosadminService } from './personalestudiosadmin.service';

describe('PersonalestudiosadminService', () => {
  let service: PersonalestudiosadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalestudiosadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
