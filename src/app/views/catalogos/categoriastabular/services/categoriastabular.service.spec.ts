import { TestBed } from '@angular/core/testing';

import { CategoriastabularService } from './categoriastabular.service';

describe('CategoriastabularService', () => {
  let service: CategoriastabularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriastabularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
