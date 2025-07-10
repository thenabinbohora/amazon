import { addToCart, cart } from '../../data/cart.js';

// javascript

describe('test suite: addToCart', () => {
    let originalQuerySelector;
    let fakeQuantitySelector;

    beforeEach(() => {
        // Mock localStorage
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
        spyOn(localStorage, 'setItem').and.stub();

        // Mock document.querySelector
        originalQuerySelector = document.querySelector;
        fakeQuantitySelector = { value: '2' };
        document.querySelector = jasmine.createSpy('querySelector').and.returnValue(fakeQuantitySelector);

        // Clear cart
        cart.length = 0;
    });

    afterEach(() => {
        document.querySelector = originalQuerySelector;
        cart.length = 0;
    });

    it('adds a new product to the cart', () => {
        addToCart('product-1');
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toBe('product-1');
        expect(cart[0].quantity).toBe(2);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('adds an existing product to the cart (increments quantity)', () => {
        // Add once
        addToCart('product-1');
        // Add again
        addToCart('product-1');
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toBe('product-1');
        expect(cart[0].quantity).toBe(4); // 2 + 2
    });

    it('uses the correct quantity from the selector', () => {
        fakeQuantitySelector.value = '5';
        addToCart('product-2');
        expect(cart[0].quantity).toBe(5);
    });

    it('does not add if quantity selector is null', () => {
        document.querySelector.and.returnValue(null);
        expect(() => addToCart('product-3')).toThrowError();
    });
});