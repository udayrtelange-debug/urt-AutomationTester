const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.baseURL = (process.env.base_url || 'https://www.saucedemo.com/').trim();
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async open() {
        await this.page.goto(this.baseURL);
        await expect(this.page).toHaveURL(this.baseURL);
        console.log(`Navigated to ${this.baseURL}`);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async toHaveURL(url) {
        await expect(this.page).toHaveURL(url);
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { LoginPage };