import { CategoriasModule } from './categorias.module';

describe('CategoriasModule', () => {
  let categoriasModule: CategoriasModule;

  beforeEach(() => {
    categoriasModule = new CategoriasModule();
  });

  it('should create an instance', () => {
    expect(categoriasModule).toBeTruthy();
  });
});
