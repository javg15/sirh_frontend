import { CatplantelesModule } from './catplanteles.module';

describe('CatplantelesModule', () => {
  let catplantelesModule: CatplantelesModule;

  beforeEach(() => {
    catplantelesModule = new CatplantelesModule();
  });

  it('should create an instance', () => {
    expect(catplantelesModule).toBeTruthy();
  });
});
