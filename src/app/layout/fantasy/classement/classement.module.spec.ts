import { ClassementModule } from './classement.module';

describe('PariModule', () => {
  let classementModule: ClassementModule;

  beforeEach(() => {
    classementModule = new ClassementModule();
  });

  it('should create an instance', () => {
    expect(classementModule).toBeTruthy();
  });
});
