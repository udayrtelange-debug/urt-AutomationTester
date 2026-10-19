const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const users = require('../data/users');

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
});

test('user login with valid user @smoke', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(users.validUser.username, users.validUser.password);
    await loginPage.toHaveURL(users.title.producturl);
});

test('user login with invalid user @regression', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(users.validateText.errorMessage);
});

test('user login with invalid password @regression', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(users.validateText.errorMessage);
});