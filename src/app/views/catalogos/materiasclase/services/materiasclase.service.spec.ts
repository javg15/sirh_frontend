import { TestBed } from '@angular/core/testing';

import { MateriasclaseService } from './materiasclase.service';

describe('MateriasclaseService', () => {
  let service: MateriasclaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriasclaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
