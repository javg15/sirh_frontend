import { TestBed } from '@angular/core/testing';

import { CatesquemapagoService } from './catesquemapago.service';

describe('CatesquemapagoService', () => {
  let service: CatesquemapagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatesquemapagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
