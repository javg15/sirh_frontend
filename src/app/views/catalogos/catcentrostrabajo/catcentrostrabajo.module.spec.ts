import { CatcentrostrabajoModule } from './catcentrostrabajo.module';

describe('CatcentrostrabajoModule', () => {
  let catcentrostrabajoModule: CatcentrostrabajoModule;

  beforeEach(() => {
    catcentrostrabajoModule = new CatcentrostrabajoModule();
  });

  it('should create an instance', () => {
    expect(catcentrostrabajoModule).toBeTruthy();
  });
});
