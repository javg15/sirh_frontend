import { TestBed } from '@angular/core/testing';

import { CatestatusplazaService } from './catestatusplaza.service';

describe('CatestatusplazaService', () => {
  let service: CatestatusplazaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestatusplazaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
