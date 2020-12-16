import { CatmunicipiosModule } from './catmunicipios.module';

describe('CatmunicipiosModule', () => {
  let catmunicipiosModule: CatmunicipiosModule;

  beforeEach(() => {
    catmunicipiosModule = new CatmunicipiosModule();
  });

  it('should create an instance', () => {
    expect(catmunicipiosModule).toBeTruthy();
  });
});
