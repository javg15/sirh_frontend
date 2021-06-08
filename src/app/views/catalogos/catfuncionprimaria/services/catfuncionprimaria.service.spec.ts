import { TestBed } from '@angular/core/testing';

import { CatfuncionprimariaService } from './catfuncionprimaria.service';

describe('CatfuncionprimariaService', () => {
  let service: CatfuncionprimariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatfuncionprimariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
