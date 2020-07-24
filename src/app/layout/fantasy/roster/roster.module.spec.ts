import { RosterModule } from './roster.module';

describe('RosterModule', () => {
  let rosterModule: RosterModule;

  beforeEach(() => {
    rosterModule = new RosterModule();
  });

  it('should create an instance', () => {
    expect(rosterModule).toBeTruthy();
  });
});
