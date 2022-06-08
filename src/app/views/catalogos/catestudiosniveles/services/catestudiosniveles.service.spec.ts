import { TestBed } from '@angular/core/testing';

import { CatestudiosnivelesService } from './catestudiosniveles.service';

describe('CatestudiosnivelesService', () => {
  let service: CatestudiosnivelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestudiosnivelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
