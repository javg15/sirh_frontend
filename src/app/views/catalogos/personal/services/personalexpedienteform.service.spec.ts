import { TestBed } from '@angular/core/testing';

import { PersonalexpedienteFormService } from './personalexpedienteform.service';

describe('PersonalexpedienteFormService', () => {
  let service: PersonalexpedienteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalexpedienteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
