import { TestBed } from '@angular/core/testing';

import { CattipohorasmateriaService } from './cattipohorasmateria.service';

describe('CattipohorasmateriaService', () => {
  let service: CattipohorasmateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattipohorasmateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
