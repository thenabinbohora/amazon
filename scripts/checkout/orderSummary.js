import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryDate } from '../utils/date.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
export function renderOrderSummary() {
    renderCheckoutHeader();
    let cartSummaryHtml = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        cartSummaryHtml += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${deliveryDate(deliveryOption)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingProduct.id}>
                                Update
                            </span>
                            <input class="quantity-input js-input-quantity">
                            <span class="save-quantity-link link-primary js-save-link" data-product-id = ${matchingProduct.id}>Save</span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const price = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
                <div class="delivery-option js-delivery-option"
                data-product-id = "${matchingProduct.id}"
                data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${deliveryDate(deliveryOption)}
                        </div>
                        <div class="delivery-option-price">
                            ${price} - Shipping
                        </div>
                    </div>
                </div>
            `
        });
        return html;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHtml;

    function updateCheckoutQuantity() {
    let cartQuantity = calculateCartQuantity();
    document.querySelector('.js-checkout-quantity').innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;
    document.querySelectorAll('.js-quantity-label').forEach(label => {
        label.innerHTML = cartQuantity;
    });
    }


    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                //const container = document.querySelector(`.js-cart-item-container-${productId}`);
                //container.remove();
                renderOrderSummary();
                renderCheckoutHeader();
                renderPaymentSummary();
            })
        });

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity');
            })
        });

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.remove('is-editing-quantity');
                const inputElement = container.querySelector('.js-input-quantity');
                let newQuantity = Number(inputElement.value);
                updateQuantity(productId, newQuantity);
                renderOrderSummary();
                renderCheckoutHeader();
                renderPaymentSummary();
            })
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        });
    }

    