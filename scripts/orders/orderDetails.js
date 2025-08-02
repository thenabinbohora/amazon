import { orders, addOrder } from "../../data/orders.js"; 
import { formatToMonthDay } from "../utils/date.js";
import { formatCurrency } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
export function renderOrderPage() {
    let ordersHTML = '';
    orders.forEach((order) => {
        let productsHTML = '';
        order.products.forEach((product) => {
            const productDetails = getProduct(product.productId);
            if (!productDetails) return;

            productsHTML += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="${productDetails.image}" class="product-image">
                    </div>
                    <div class="product-details">
                        <div class="product-name">${productDetails.name}</div>
                        <div class="product-delivery-date">
                            Arriving on: ${formatToMonthDay(product.estimatedDeliveryTime)}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${product.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                    </div>
                </div>
            `;
        });

        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${formatToMonthDay(order.orderTime)}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>
                ${productsHTML}
            </div>
        `;
    });

    document.querySelector('.js-order-grid').innerHTML = ordersHTML;
}
renderOrderPage();
