import { PlazasModule } from './plazas.module';

describe('PlazasModule', () => {
  let plazasModule: PlazasModule;

  beforeEach(() => {
    plazasModule = new PlazasModule();
  });

  it('should create an instance', () => {
    expect(plazasModule).toBeTruthy();
  });
});
