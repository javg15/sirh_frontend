import { TestBed } from '@angular/core/testing';

import { CatsindicatoService } from './catsindicato.service';

describe('CatsindicatoService', () => {
  let service: CatsindicatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsindicatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
