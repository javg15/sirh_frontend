import { TestBed } from '@angular/core/testing';

import { PersonalestudiosService } from './personalestudios.service';

describe('PersonalestudiosService', () => {
  let service: PersonalestudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalestudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
