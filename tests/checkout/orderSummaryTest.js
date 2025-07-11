import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { cart } from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
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

    it('renders the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        `;
        renderOrderSummary();
    });
});