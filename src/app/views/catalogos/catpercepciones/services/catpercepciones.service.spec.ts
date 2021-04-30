import { TestBed } from '@angular/core/testing';

import { CatpercepcionesService } from './catpercepciones.service';

describe('CatpercepcionesService', () => {
  let service: CatpercepcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatpercepcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
