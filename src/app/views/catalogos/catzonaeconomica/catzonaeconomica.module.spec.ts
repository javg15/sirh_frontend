import { CatzonaeconomicaModule } from './catzonaeconomica.module';

describe('CatzonaeconomicaModule', () => {
  let catzonaeconomicaModule: CatzonaeconomicaModule;

  beforeEach(() => {
    catzonaeconomicaModule = new CatzonaeconomicaModule();
  });

  it('should create an instance', () => {
    expect(catzonaeconomicaModule).toBeTruthy();
  });
});
