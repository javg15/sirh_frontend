import { TestBed } from '@angular/core/testing';

import { CatdocumentosService } from './catdocumentos.service';

describe('CatdocumentosService', () => {
  let service: CatdocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatdocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
