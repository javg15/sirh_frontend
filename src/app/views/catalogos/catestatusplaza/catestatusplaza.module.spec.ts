import { CatestatusplazaModule } from './catestatusplaza.module';

describe('CatestatusplazaModule', () => {
  let catestatusplazaModule: CatestatusplazaModule;

  beforeEach(() => {
    catestatusplazaModule = new CatestatusplazaModule();
  });

  it('should create an instance', () => {
    expect(catestatusplazaModule).toBeTruthy();
  });
});
