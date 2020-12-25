import { TestBed } from '@angular/core/testing';

import { CategoriassueldosService } from './categoriassueldos.service';

describe('CategoriassueldosService', () => {
  let service: CategoriassueldosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriassueldosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
