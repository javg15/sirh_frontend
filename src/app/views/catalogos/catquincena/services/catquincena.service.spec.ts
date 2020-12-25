import { TestBed } from '@angular/core/testing';

import { CatquincenaService } from './catquincena.service';

describe('CatquincenaService', () => {
  let service: CatquincenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatquincenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
