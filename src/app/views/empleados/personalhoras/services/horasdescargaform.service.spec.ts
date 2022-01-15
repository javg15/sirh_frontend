import { TestBed } from '@angular/core/testing';

import { HorasdescargaFormService } from './horasdescargaform.service';

describe('HorasdescargaFormService', () => {
  let service: HorasdescargaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasdescargaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
