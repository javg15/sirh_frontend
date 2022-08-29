import { TestBed } from '@angular/core/testing';

import { CatpercepcionescategoriasService } from './catpercepcionescategorias.service';

describe('CatpercepcionescategoriasService', () => {
  let service: CatpercepcionescategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatpercepcionescategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
