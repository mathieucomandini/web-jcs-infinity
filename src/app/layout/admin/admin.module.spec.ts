import { AdminModule } from './admin.module';

describe('MespariModule', () => {
  let adminModule: AdminModule;

  beforeEach(() => {
    adminModule = new AdminModule();
  });

  it('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});
