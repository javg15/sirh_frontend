import { TestBed } from '@angular/core/testing';

import { CatplantillasService } from './catplantillas.service';

describe('CatplantillasService', () => {
  let service: CatplantillasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatplantillasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
