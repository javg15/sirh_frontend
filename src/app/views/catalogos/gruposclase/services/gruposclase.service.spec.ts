import { TestBed } from '@angular/core/testing';

import { GruposclaseService } from './gruposclase.service';

describe('GruposclaseService', () => {
  let service: GruposclaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposclaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
