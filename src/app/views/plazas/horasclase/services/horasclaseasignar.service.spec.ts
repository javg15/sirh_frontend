import { TestBed } from '@angular/core/testing';

import { HorasclaseasignarService } from './horasclaseasignar.service';

describe('HorasclaseasignarService', () => {
  let service: HorasclaseasignarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasclaseasignarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
