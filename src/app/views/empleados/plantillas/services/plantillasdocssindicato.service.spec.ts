import { TestBed } from '@angular/core/testing';

import { PlantillasdocsSindicatoService } from './plantillasdocssindicato.service';

describe('PlantillasdocsSindicatoService', () => {
  let service: PlantillasdocsSindicatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsSindicatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
