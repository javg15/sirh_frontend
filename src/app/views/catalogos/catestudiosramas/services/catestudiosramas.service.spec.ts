import { TestBed } from '@angular/core/testing';

import { CatestudiosramasService } from './catestudiosramas.service';

describe('CatestudiosramasService', () => {
  let service: CatestudiosramasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatestudiosramasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
