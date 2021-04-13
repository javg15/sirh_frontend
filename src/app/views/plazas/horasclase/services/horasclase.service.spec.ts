import { TestBed } from '@angular/core/testing';

import { HorasclaseService } from './horasclase.service';

describe('HorasclaseService', () => {
  let service: HorasclaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasclaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
