import { PaquetModule } from './paquet.module';

describe('PaquetModule', () => {
  let paquetModule: PaquetModule;

  beforeEach(() => {
    paquetModule = new PaquetModule();
  });

  it('should create an instance', () => {
    expect(paquetModule).toBeTruthy();
  });
});
