import { TestBed } from '@angular/core/testing';

import { CattipohorasdocenteService } from './cattipohorasdocente.service';

describe('CattipohorasdocenteService', () => {
  let service: CattipohorasdocenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattipohorasdocenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
