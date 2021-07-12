import { MateriasclaseModule } from './materiasclase.module';

describe('MateriasclaseModule', () => {
  let materiasclaseModule: MateriasclaseModule;

  beforeEach(() => {
    materiasclaseModule = new MateriasclaseModule();
  });

  it('should create an instance', () => {
    expect(materiasclaseModule).toBeTruthy();
  });
});
