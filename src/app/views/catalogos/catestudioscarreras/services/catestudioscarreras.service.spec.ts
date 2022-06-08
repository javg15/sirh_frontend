import { TestBed } from '@angular/core/testing';

import { CatestudioscarrerasService } from './catestudioscarreras.service';

describe('CatestudioscarrerasService', () => {
  let service: CatestudioscarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestudioscarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
