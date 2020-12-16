import { TestBed } from '@angular/core/testing';

import { CatcentrostrabajoService } from './catcentrostrabajo.service';

describe('CatcentrostrabajoService', () => {
  let service: CatcentrostrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatcentrostrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
