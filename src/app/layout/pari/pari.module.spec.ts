import { PariModule } from './pari.module';

describe('PariModule', () => {
  let pariModule: PariModule;

  beforeEach(() => {
    pariModule = new PariModule();
  });

  it('should create an instance', () => {
    expect(pariModule).toBeTruthy();
  });
});
