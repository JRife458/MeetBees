export class NavigationPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("http://localhost:3000/");
  }
}
