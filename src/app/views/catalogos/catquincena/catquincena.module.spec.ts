import { CatquincenaModule } from './catquincena.module';

describe('CatquincenaModule', () => {
  let catquincenaModule: CatquincenaModule;

  beforeEach(() => {
    catquincenaModule = new CatquincenaModule();
  });

  it('should create an instance', () => {
    expect(catquincenaModule).toBeTruthy();
  });
});
