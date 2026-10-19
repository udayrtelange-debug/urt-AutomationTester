const { expect } = require('@playwright/test');

class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
    }

    async getInventoryItemsCount() {
        return await this.inventoryItems.count();
    }

    async expectItemsVisible() {
        await expect(this.inventoryItems.first()).toBeVisible();
    }

    async addItemToCart(itemName) {
        const item = this.inventoryItems.filter({
            has: this.page.getByText(itemName, { exact: true }),
        });
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.shoppingCartLink.click();
    }

    async removeItemFromCart(itemName) {
        const item = this.cartItems.filter({
            has: this.page.getByText(itemName, { exact: true }),
        });
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    async expectCartCount(count) {
        if (count === 0) {
            await expect(this.shoppingCartBadge).toHaveCount(0);
            return;
        }

        await expect(this.shoppingCartBadge).toHaveText(String(count));
    }

}

module.exports = { InventoryPage };