import { TestBed } from '@angular/core/testing';

import { CatmunicipiosService } from './catmunicipios.service';

describe('CatmunicipiosService', () => {
  let service: CatmunicipiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatmunicipiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
