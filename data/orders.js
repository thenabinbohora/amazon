export const orders = JSON.parse(localStorage.getItem('orders'))||[];

export function addOrder(order) {
    orders.unshift(order); // place at front of the array
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export async function loadOrderFetch() {
    const response = await fetch('https://supersimplebackend.dev/orders');
    return response;
}