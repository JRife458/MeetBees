import { NavigationPage } from "./navigationPage";

export class PageManager {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }
}
