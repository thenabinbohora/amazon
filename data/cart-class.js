class Cart {
    cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    // # for private properties
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
    }
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    getCartProduct(productId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            };
        });
        return matchingItem;
    }

    addToCart(productId) {
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);
        let matchingItem = this.getCartProduct(productId);
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        };
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (productId !== cartItem.productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (newQuantity > 1000 && newQuantity < 0) {
                cartQuantity.quantity = quantity;
            }
            if ((cartItem.productId === productId) && (newQuantity < 1000 && newQuantity > 0)) {
                cartItem.quantity = newQuantity;
            }
        });
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.getCartProduct(productId);
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



