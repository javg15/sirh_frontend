import { TestBed } from '@angular/core/testing';

import { PlantillasdocsFamiliaresService } from './plantillasdocsfamiliares.service';

describe('PlantillasdocsFamiliaresService', () => {
  let service: PlantillasdocsFamiliaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsFamiliaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
