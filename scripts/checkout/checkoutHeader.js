import {calculateCartQuantity} from '../../data/cart.js';
export function renderCheckoutHeader() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-quantity').innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;
}