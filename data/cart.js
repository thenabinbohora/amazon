export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
    let matchingItem;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItemtem;
        };
    });
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity
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