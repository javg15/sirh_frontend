import { TestBed } from '@angular/core/testing';

import { CatregionesService } from './catregiones.service';

describe('CatregionesService', () => {
  let service: CatregionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatregionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
