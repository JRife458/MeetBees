const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
import { NavigationPage } from "../page-objects/navigationPage";
import { UtilitiesPage } from "../page-objects/utilitiesPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create And Delete A Group Test", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const utilities = new UtilitiesPage(page, navigateTo);

  await utilities.demoLogin();
  await navigateTo.groupsPage();

  const openCreateGroupModalButton = await page.getByRole("button", {
    name: "Create Group",
  });
  await openCreateGroupModalButton.click();

  const createGroupForm = await page.locator(".create-group-form");
  const nameInput = await createGroupForm.getByLabel("Name:");
  const aboutInput = await createGroupForm.getByLabel("About:");
  const cityInput = await createGroupForm.getByLabel("City:");
  const stateInput = await createGroupForm.getByLabel("State:");
  const submitButton = await createGroupForm.getByRole("button");

  const randomGroupName = faker.company.name();
  const randomAbout = faker.lorem.paragraph(50);
  const randomCity = faker.location.city();
  const randomState = faker.location.state();

  await nameInput.fill(randomGroupName);
  await aboutInput.fill(randomAbout);
  await createGroupForm.getByLabel("In Person", { exact: true }).click();
  await cityInput.fill(randomCity);
  await stateInput.fill(randomState);

  await submitButton.click();

  const groupInfo = await page.locator(".groupInfo");
  const groupSpecifics = await groupInfo.locator(".group-specifics");
  const groupAboutContent = await groupInfo.locator(".group-about");

  await expect(groupSpecifics).toContainText(randomGroupName);
  await expect(groupSpecifics).toContainText(randomCity);
  await expect(groupSpecifics).toContainText(randomState);
  await expect(groupAboutContent).toContainText(randomAbout);

  const deleteButton = await page.getByRole("button", {
    name: "Delete Group",
  });
  await deleteButton.click();

  await expect(page.locator(".groups-list")).not.toContainText(randomGroupName);
});
