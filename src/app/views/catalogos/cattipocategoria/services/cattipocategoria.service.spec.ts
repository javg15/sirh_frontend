import { TestBed } from '@angular/core/testing';

import { CattipocategoriaService } from './cattipocategoria.service';

describe('CattipocategoriaService', () => {
  let service: CattipocategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattipocategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
