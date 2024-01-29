const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
import { NavigationPage } from "../page-objects/navigationPage";
import { UtilitiesPage } from "../page-objects/utilitiesPage";
import { normalizeDate } from "../frontend/src/store/events";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create And Delete An Event Test", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const utilities = new UtilitiesPage(page, navigateTo);

  await utilities.demoLogin();
  await navigateTo.groupsPage();

  const group = await page.locator(".group-details", {
    has: page.getByText("Pro Limbo League"),
  });
  await group.getByRole("link").click();

  const openCreateEventModalButton = await page.getByRole("button", {
    name: "Create Event",
  });
  await openCreateEventModalButton.click();

  const createEventForm = await page.locator(".create-event-form");
  const nameInput = await createEventForm.getByLabel("Name:");
  const descriptionInput = await createEventForm.getByLabel("Description:");
  const startTimeInput = await createEventForm.getByLabel("Start:");
  const endTimeInput = await createEventForm.getByLabel("End:");
  const capacityInput = await createEventForm.getByLabel("Capacity:");
  const priceInput = await createEventForm.getByLabel("Price:");
  const submitButton = await createEventForm.getByRole("button");

  const randomEventName = faker.company.name();
  const randomDescription = faker.lorem.paragraph(50);
  const randomStartTime = faker.date.soon();
  const randomEndDate = faker.date.between({
    from: randomStartTime,
    to: new Date(randomStartTime.getTime() + 7 * 24 * 60 * 60 * 1000),
  });
  const formattedStartDate = randomStartTime.toISOString().slice(0, 16);
  const formattedEndDate = randomEndDate.toISOString().slice(0, 16);
  // const randomPrice = faker.commerce.price();
  // const randomCapacity = `${faker.number.int()}`;

  await nameInput.fill(randomEventName);
  await descriptionInput.fill(randomDescription);
  await createEventForm.getByLabel("Online", { exact: true }).click();
  await startTimeInput.fill(formattedStartDate);
  await endTimeInput.fill(formattedEndDate);
  // await capacityInput.fill(randomCapacity);
  // await priceInput.fill(randomPrice);
  await submitButton.click();

  const singleEvent = await page.locator(".single-event");
  const eventInfo = await singleEvent.locator(".single-event-info");
  const eventTime = await singleEvent.locator(".event-time-location");
  const normalizedStartDate = normalizeDate(formattedStartDate);
  const normalizedEndDate = normalizeDate(formattedEndDate);
  const eventDescriptionContent = await singleEvent.locator(
    ".single-event-details"
  );

  await expect(eventInfo).toContainText(randomEventName);
  await expect(eventTime).toContainText(normalizedStartDate);
  await expect(eventTime).toContainText(normalizedEndDate);
  await expect(eventDescriptionContent).toContainText(randomDescription);

  const deleteButton = await page.getByRole("button", {
    name: "Delete Event",
  });
  await deleteButton.click();

  await expect(page.locator(".events-list")).not.toContainText(randomEventName);
});
