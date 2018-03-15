import { AppPage } from './app.po';

describe('ngx-feature-toggle App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display `ngx-feature-toggle`', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngx-feature-toggle');
  });
});
