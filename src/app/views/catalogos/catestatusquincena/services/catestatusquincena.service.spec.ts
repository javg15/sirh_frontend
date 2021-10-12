import { TestBed } from '@angular/core/testing';

import { CatestatusquincenaService } from './catestatusquincena.service';

describe('CatestatusquincenaService', () => {
  let service: CatestatusquincenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestatusquincenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
