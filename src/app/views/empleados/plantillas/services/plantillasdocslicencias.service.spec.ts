import { TestBed } from '@angular/core/testing';

import { PlantillasdocsLicenciasService } from './plantillasdocslicencias.service';

describe('PlantillasdocsLicenciasService', () => {
  let service: PlantillasdocsLicenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsLicenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
