import { TestBed } from '@angular/core/testing';

import { HorasclasedetalleService } from './horasclasedetalle.service';

describe('HorasclasedetalleService', () => {
  let service: HorasclasedetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasclasedetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
