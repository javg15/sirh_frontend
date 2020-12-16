import { TestBed } from '@angular/core/testing';

import { CattiponominaService } from './cattiponomina.service';

describe('CattiponominaService', () => {
  let service: CattiponominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattiponominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
