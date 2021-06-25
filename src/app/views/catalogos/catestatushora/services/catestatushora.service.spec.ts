import { TestBed } from '@angular/core/testing';

import { CatestatushoraService } from './catestatushora.service';

describe('CatestatushoraService', () => {
  let service: CatestatushoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestatushoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
