export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
    
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    let matchingItem = getCartProduct(productId);
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    };
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (newQuantity > 1000 && newQuantity < 0) {
            cartQuantity.quantity = quantity;
        }
        if ((cartItem.productId === productId) && (newQuantity < 1000 && newQuantity > 0)) {
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();
}

export function getCartProduct(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        };
    });
    return matchingItem;
}
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = getCartProduct(productId);
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    return response;
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}