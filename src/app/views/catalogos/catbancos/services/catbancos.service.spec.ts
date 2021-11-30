import { TestBed } from '@angular/core/testing';

import { CatbancosService } from './catbancos.service';

describe('CatbancosService', () => {
  let service: CatbancosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatbancosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
