import { PariClassementModule } from './pari-classement.module';

describe('PariClassementModule', () => {
  let pariModule: PariClassementModule;

  beforeEach(() => {
    pariModule = new PariClassementModule();
  });

  it('should create an instance', () => {
    expect(pariModule).toBeTruthy();
  });
});
