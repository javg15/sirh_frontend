import { TestBed } from '@angular/core/testing';

import { CatestudiostiposService } from './catestudiostipos.service';

describe('CatestudiostiposService', () => {
  let service: CatestudiostiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestudiostiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
