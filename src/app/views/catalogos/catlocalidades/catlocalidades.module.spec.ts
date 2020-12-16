import { CatlocalidadesModule } from './catlocalidades.module';

describe('CatlocalidadesModule', () => {
  let catlocalidadesModule: CatlocalidadesModule;

  beforeEach(() => {
    catlocalidadesModule = new CatlocalidadesModule();
  });

  it('should create an instance', () => {
    expect(catlocalidadesModule).toBeTruthy();
  });
});
