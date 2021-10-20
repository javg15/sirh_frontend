import { TestBed } from '@angular/core/testing';

import { HorasasignacionFormService } from './horasasignacionform.service';

describe('HorasasignacionFormService', () => {
  let service: HorasasignacionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasasignacionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
