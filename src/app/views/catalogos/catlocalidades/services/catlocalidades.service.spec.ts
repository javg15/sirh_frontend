import { TestBed } from '@angular/core/testing';

import { CatlocalidadesService } from './catlocalidades.service';

describe('CatlocalidadesService', () => {
  let service: CatlocalidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatlocalidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
