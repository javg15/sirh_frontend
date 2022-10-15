import { TestBed } from '@angular/core/testing';

import { HorashistorialService } from './horashistorial.service';

describe('HorashistorialService', () => {
  let service: HorashistorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorashistorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
