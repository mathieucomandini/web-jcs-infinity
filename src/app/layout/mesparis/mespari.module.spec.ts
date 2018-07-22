import { MespariModule } from './mespari.module';

describe('MespariModule', () => {
  let pariModule: MespariModule;

  beforeEach(() => {
    pariModule = new MespariModule();
  });

  it('should create an instance', () => {
    expect(pariModule).toBeTruthy();
  });
});
