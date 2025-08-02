import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
    try {
        //throw 'error';
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);
        // await loadProductsFetch();
        // await loadCartFetch();
        // await new Promise((resolve, reject) => {
        //     loadCart(() => {
        //         //reject('error');
        //         resolve();
        //     });
        // })
    } catch (error) {
        console.log('Unexpected error. Please try again later..');
    }  

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*
Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() =>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
    
}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
    
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
