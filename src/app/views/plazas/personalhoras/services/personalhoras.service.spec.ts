import { TestBed } from '@angular/core/testing';

import { PersonalhorasService } from './personalhoras.service';

describe('PersonalhorasService', () => {
  let service: PersonalhorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalhorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
