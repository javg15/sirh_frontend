import { TestBed } from '@angular/core/testing';

import { CatestadosService } from './catestados.service';

describe('CatestadosService', () => {
  let service: CatestadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
