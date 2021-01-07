import { TestBed } from '@angular/core/testing';

import { CattipocentrotrabajoService } from './catturnos.service';

describe('CattipocentrotrabajoService', () => {
  let service: CattipocentrotrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattipocentrotrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
