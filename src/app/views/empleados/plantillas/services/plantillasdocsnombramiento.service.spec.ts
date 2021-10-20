import { TestBed } from '@angular/core/testing';

import { PlantillasdocsNombramientoService } from './plantillasdocsnombramiento.service';

describe('PlantillasdocsNombramientoService', () => {
  let service: PlantillasdocsNombramientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsNombramientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
