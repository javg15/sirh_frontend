import { TestBed } from '@angular/core/testing';

import { CatbajamotivoService } from './catbajamotivo.service';

describe('CatbajamotivoService', () => {
  let service: CatbajamotivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatbajamotivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
