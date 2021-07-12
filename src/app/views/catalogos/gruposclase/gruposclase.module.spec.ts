import { GruposclaseModule } from './gruposclase.module';

describe('GruposclaseModule', () => {
  let gruposclaseModule: GruposclaseModule;

  beforeEach(() => {
    gruposclaseModule = new GruposclaseModule();
  });

  it('should create an instance', () => {
    expect(gruposclaseModule).toBeTruthy();
  });
});
