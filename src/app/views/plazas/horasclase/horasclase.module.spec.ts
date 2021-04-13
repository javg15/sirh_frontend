import { HorasclaseModule } from './horasclase.module';

describe('HorasclaseModule', () => {
  let horasclaseModule: HorasclaseModule;

  beforeEach(() => {
    horasclaseModule = new HorasclaseModule();
  });

  it('should create an instance', () => {
    expect(horasclaseModule).toBeTruthy();
  });
});
