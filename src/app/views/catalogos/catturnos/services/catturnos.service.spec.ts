import { TestBed } from '@angular/core/testing';

import { CatturnosService } from './catturnos.service';

describe('CatturnosService', () => {
  let service: CatturnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatturnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
