import { TestBed } from '@angular/core/testing';

import { PersonalEstudiosService } from './personalestudios.service';

describe('PersonalEstudiosService', () => {
  let service: PersonalEstudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalEstudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
