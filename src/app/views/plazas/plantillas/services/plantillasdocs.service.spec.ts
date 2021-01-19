import { TestBed } from '@angular/core/testing';

import { PlantillasdocsService } from './plantillasdocs.service';

describe('PlantillasdocsService', () => {
  let service: PlantillasdocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillasdocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
