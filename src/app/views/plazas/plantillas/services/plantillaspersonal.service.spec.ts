import { TestBed } from '@angular/core/testing';

import { PlantillaspersonalService } from './plantillaspersonal.service';

describe('PlantillaspersonalService', () => {
  let service: PlantillaspersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaspersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
