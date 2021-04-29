import { TestBed } from '@angular/core/testing';

import { CategoriaspercepcionesService } from './categoriaspercepciones.service';

describe('CategoriaspercepcionesService', () => {
  let service: CategoriaspercepcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaspercepcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
