import { TestBed } from '@angular/core/testing';

import { PlazashistorialService } from './plazashistorial.service';

describe('PlazashistorialService', () => {
  let service: PlazashistorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlazashistorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
