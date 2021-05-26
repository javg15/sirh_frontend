import { TestBed } from '@angular/core/testing';

import { PlantillasdocsBajaService } from './plantillasdocsbaja.service';

describe('PlantillasdocsBajaService', () => {
  let service: PlantillasdocsBajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsBajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
