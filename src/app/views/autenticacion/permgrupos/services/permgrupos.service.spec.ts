import { TestBed } from '@angular/core/testing';

import { PermgruposService } from './permgrupos.service';

describe('PermgruposService', () => {
  let service: PermgruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermgruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
