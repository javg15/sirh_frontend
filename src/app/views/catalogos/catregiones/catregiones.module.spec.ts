import { CatregionesModule } from './catregiones.module';

describe('CatregionesModule', () => {
  let catregionesModule: CatregionesModule;

  beforeEach(() => {
    catregionesModule = new CatregionesModule();
  });

  it('should create an instance', () => {
    expect(catregionesModule).toBeTruthy();
  });
});
