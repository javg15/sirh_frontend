import { TestBed } from '@angular/core/testing';

import { CategoriasdetalleService } from './categoriasdetalle.service';

describe('CategoriasdetalleService', () => {
  let service: CategoriasdetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasdetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
