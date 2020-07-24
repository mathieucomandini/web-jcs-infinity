import { ProfilFantasyModule } from './profil.module';

describe('ProfilModule', () => {
  let profilModule: ProfilFantasyModule;

  beforeEach(() => {
    profilModule = new ProfilFantasyModule();
  });

  it('should create an instance', () => {
    expect(profilModule).toBeTruthy();
  });
});
