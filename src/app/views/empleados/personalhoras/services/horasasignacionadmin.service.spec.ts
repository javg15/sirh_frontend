import { TestBed } from '@angular/core/testing';

import { HorasasignacionAdminService } from './horasasignacionadmin.service';

describe('HorasasignacionAdminService', () => {
  let service: HorasasignacionAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasasignacionAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
