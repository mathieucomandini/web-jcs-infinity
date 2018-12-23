import { StatsModule } from './stats.module';

describe('StatsModule', () => {
    let chartsModule: StatsModule;

    beforeEach(() => {
        chartsModule = new StatsModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
