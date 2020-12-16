import { TestBed } from '@angular/core/testing';

import { CatzonaeconomicaService } from './catzonaeconomica.service';

describe('CatzonaeconomicaService', () => {
  let service: CatzonaeconomicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatzonaeconomicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
