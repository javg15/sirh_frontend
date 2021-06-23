import { TestBed } from '@angular/core/testing';

import { PersonalhorasFormService } from './personalhorasform.service';

describe('PersonalhorasFormService', () => {
  let service: PersonalhorasFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalhorasFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
