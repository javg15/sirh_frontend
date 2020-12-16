import { TestBed } from '@angular/core/testing';

import { CatzonageograficaService } from './catzonageografica.service';

describe('CatzonageograficaService', () => {
  let service: CatzonageograficaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatzonageograficaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
