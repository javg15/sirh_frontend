import { TestBed } from '@angular/core/testing';

import { PlantillashistorialnominaService } from './plantillashistorialnomina.service';

describe('PlantillashistorialService', () => {
  let service: PlantillashistorialnominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillashistorialnominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
