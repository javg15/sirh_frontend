import { TestBed } from '@angular/core/testing';

import { PersonalEstudiosFormService } from './personalestudiosform.service';

describe('PersonalEstudiosFormService', () => {
  let service: PersonalEstudiosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalEstudiosFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
