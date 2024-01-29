export class UtilitiesPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page, navigateTo) {
    this.page = page;
    this.navigateTo = navigateTo;
  }

  async demoLogin() {
    await this.navigateTo.loginModal();
    const loginForm = await this.page.locator(".login-form");
    const demoUserButton = await loginForm.getByRole("button", {
      name: "Demo User",
    });
    await demoUserButton.click();
  }
}
