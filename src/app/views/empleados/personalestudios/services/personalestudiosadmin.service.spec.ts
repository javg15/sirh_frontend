import { TestBed } from '@angular/core/testing';

import { PersonalEstudiosAdminService } from './personalestudiosadmin.service';

describe('PersonalEstudiosAdminService', () => {
  let service: PersonalEstudiosAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalEstudiosAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
