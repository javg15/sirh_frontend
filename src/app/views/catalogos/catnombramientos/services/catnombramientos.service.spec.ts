import { TestBed } from '@angular/core/testing';

import { CatnombramientosService } from './catnombramientos.service';

describe('CatnombramientosService', () => {
  let service: CatnombramientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatnombramientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
