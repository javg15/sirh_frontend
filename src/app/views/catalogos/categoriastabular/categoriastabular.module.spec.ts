import { CategoriastabularModule } from './categoriastabular.module';

describe('CategoriastabularModule', () => {
  let categoriastabularModule: CategoriastabularModule;

  beforeEach(() => {
    categoriastabularModule = new CategoriastabularModule();
  });

  it('should create an instance', () => {
    expect(categoriastabularModule).toBeTruthy();
  });
});
