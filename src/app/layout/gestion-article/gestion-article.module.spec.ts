import { GestionArticleModule } from './gestion-article.module';

describe('ArticleModule', () => {
  let pariModule: GestionArticleModule;

  beforeEach(() => {
    pariModule = new GestionArticleModule();
  });

  it('should create an instance', () => {
    expect(pariModule).toBeTruthy();
  });
});
