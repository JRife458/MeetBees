export class NavigationPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async groupsPage() {
    await this.page.getByText("Find Groups").click();
  }

  async eventsPage() {
    await this.page.getByText("Find Events").click();
  }

  async signupPage() {
    await this.page.getByText("Sign Up").click();
  }

  async loginModal() {
    await this.page.getByText("Log In").click();
  }
}
