import { TestBed } from '@angular/core/testing';

import { PlantillasdocsProfesionalService } from './plantillasdocsprofesional.service';

describe('PlantillasdocsProfesionalService', () => {
  let service: PlantillasdocsProfesionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsProfesionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
