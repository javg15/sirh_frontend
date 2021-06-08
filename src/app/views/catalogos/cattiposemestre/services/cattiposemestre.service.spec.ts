import { TestBed } from '@angular/core/testing';

import { CattiposemestreService } from './cattiposemestre.service';

describe('CattiposemestreService', () => {
  let service: CattiposemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattiposemestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
