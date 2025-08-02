import { renderOrderPage } from "./orders/orderDetails.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
import { loadOrderFetch } from "../data/orders.js";

async function loadPage() {
    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch(),
        ]);
    } catch (error) {
        console.log('Unexpected error. Please try again later..');
    }
    renderOrderPage();
}
loadPage();