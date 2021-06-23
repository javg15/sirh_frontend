import { TestBed } from '@angular/core/testing';

import { PersonalhorasAdminService } from './personalhorasadmin.service';

describe('PersonalhorasAdminService', () => {
  let service: PersonalhorasAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalhorasAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
