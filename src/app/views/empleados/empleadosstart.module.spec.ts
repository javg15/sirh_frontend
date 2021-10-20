import { EmpleadosStartModule } from './empleadosstart.module';

describe('EmpleadosStartModule', () => {
  let empleadosStartModule: EmpleadosStartModule;

  beforeEach(() => {
    empleadosStartModule = new EmpleadosStartModule();
  });

  it('should create an instance', () => {
    expect(empleadosStartModule).toBeTruthy();
  });
});
