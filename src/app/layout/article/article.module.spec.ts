import { ArticleModule } from './article.module';

describe('ArticleModule', () => {
  let pariModule: ArticleModule;

  beforeEach(() => {
    pariModule = new ArticleModule();
  });

  it('should create an instance', () => {
    expect(pariModule).toBeTruthy();
  });
});
