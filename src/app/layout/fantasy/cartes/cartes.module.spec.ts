import { CartesModule } from './cartes.module';

describe('CartesModule', () => {
  let cartesModule: CartesModule;

  beforeEach(() => {
    cartesModule = new CartesModule();
  });

  it('should create an instance', () => {
    expect(cartesModule).toBeTruthy();
  });
});
