const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
import { NavigationPage } from "../page-objects/navigationPage";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Login Successful Test", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.loginModal();

  const loginForm = await page.locator(".login-form");
  const emailInput = await loginForm.getByLabel("Username or Email");
  const passwordInput = await loginForm.getByLabel("Password");
  const submitButton = await loginForm.getByRole("button", {
    name: "Log In",
  });

  await emailInput.fill("demo@user.io");
  await passwordInput.fill("password");
  await submitButton.click();

  await expect(await page.locator(".splash-message")).toContainText(
    "Demo User"
  );
});

test("Login Failed Test", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.loginModal();

  const loginForm = await page.locator(".login-form");
  const emailInput = await loginForm.getByLabel("Username or Email");
  const passwordInput = await loginForm.getByLabel("Password");
  const submitButton = await loginForm.getByRole("button", {
    name: "Log In",
  });

  await emailInput.fill("wrongEmail");
  await passwordInput.fill("wrongPassword");
  await submitButton.click();

  await expect(await loginForm.getByRole("listitem")).toContainText(
    "The provided credentials were invalid."
  );
});

test("Sign Up Test", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.signupPage();

  const signUpForm = await page.locator(".signup-form");
  const emailInput = await signUpForm.getByLabel("Email");
  const usernameInput = await signUpForm.getByLabel("Username");
  const firstNameInput = await signUpForm.getByLabel("First Name");
  const lastNameInput = await signUpForm.getByLabel("Last Name");
  const passwordInput = await signUpForm.getByLabel("Password", {
    exact: true,
  });
  const confirmPasswordInput = await signUpForm.getByLabel("Confirm Password");
  const submitButton = await signUpForm.getByRole("button");

  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();
  const randomUsername = faker.internet.userName();

  await emailInput.fill(randomEmail);
  await usernameInput.fill(randomUsername);
  await firstNameInput.fill(randomFirstName);
  await lastNameInput.fill(randomLastName);
  await passwordInput.fill(randomPassword);
  await confirmPasswordInput.fill(randomPassword);
  await submitButton.click();

  await expect(await page.locator(".splash-message")).toContainText(
    randomFirstName
  );
});
