const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const users = require('../data/users');

const itemName = 'Sauce Labs Backpack';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
});

test('user can view inventory items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectItemsVisible();
});

test('user should add item to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.expectCartCount(1);
});

test('user should remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.openCart();
    await inventoryPage.removeItemFromCart(itemName);
    await inventoryPage.expectCartCount(0);
});
