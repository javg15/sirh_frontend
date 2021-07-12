import { SemestreModule } from './semestre.module';

describe('SemestreModule', () => {
  let semestreModule: SemestreModule;

  beforeEach(() => {
    semestreModule = new SemestreModule();
  });

  it('should create an instance', () => {
    expect(semestreModule).toBeTruthy();
  });
});
