import { TestBed } from '@angular/core/testing';

import { CatestadocivilService } from './catestadocivil.service';

describe('CatestadocivilService', () => {
  let service: CatestadocivilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestadocivilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
