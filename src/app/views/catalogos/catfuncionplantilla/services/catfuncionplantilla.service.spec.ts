import { TestBed } from '@angular/core/testing';

import { CatfuncionplantillaService } from './catfuncionplantilla.service';

describe('CatfuncionplantillaService', () => {
  let service: CatfuncionplantillaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatfuncionplantillaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
