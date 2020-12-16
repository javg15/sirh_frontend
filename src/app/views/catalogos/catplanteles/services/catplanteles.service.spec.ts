import { TestBed } from '@angular/core/testing';

import { CatplantelesService } from './catplanteles.service';

describe('CatplantelesService', () => {
  let service: CatplantelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatplantelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
