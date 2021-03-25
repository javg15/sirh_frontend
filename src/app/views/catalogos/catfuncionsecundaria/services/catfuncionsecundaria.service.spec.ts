import { TestBed } from '@angular/core/testing';

import { CatfuncionsecundariaService } from './catfuncionsecundaria.service';

describe('CatfuncionsecundariaService', () => {
  let service: CatfuncionsecundariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatfuncionsecundariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
