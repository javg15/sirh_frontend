import { PlazasStartModule } from './plazasstart.module';

describe('PlazasStartModule', () => {
  let plazasStartModule: PlazasStartModule;

  beforeEach(() => {
    plazasStartModule = new PlazasStartModule();
  });

  it('should create an instance', () => {
    expect(plazasStartModule).toBeTruthy();
  });
});
