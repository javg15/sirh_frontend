import { TestBed } from '@angular/core/testing';

import { UsuarioszonasService } from './usuarioszonas.service';

describe('UsuarioszonasService', () => {
  let service: UsuarioszonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioszonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
