import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export function deliveryDate(deliveryOption) {
    const today = dayjs();
    let daysToAdd = deliveryOption.deliveryDays
    let deliveryDate = today;
    while (daysToAdd>0) {
        deliveryDate = deliveryDate.add(1, 'day')
        if (!(deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday')) {
            daysToAdd--;
        }
    }
    return deliveryDate.format('dddd, MMMM D');
}
