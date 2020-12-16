import { CatzonageograficaModule } from './catzonageografica.module';

describe('CatzonageograficaModule', () => {
  let catzonageograficaModule: CatzonageograficaModule;

  beforeEach(() => {
    catzonageograficaModule = new CatzonageograficaModule();
  });

  it('should create an instance', () => {
    expect(catzonageograficaModule).toBeTruthy();
  });
});
