// @ts-check
const { test, expect } = require("@playwright/test");
import { NavigationPage } from "../page-objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MeetBees/);
});

test("has groups", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.groupsPage();
  const groups = await page.locator(".groups-list");
  await expect(groups).toBeVisible();
});
