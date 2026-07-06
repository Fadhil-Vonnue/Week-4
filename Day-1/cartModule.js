const CartModule = (function () {
    let cart = [];
    return {
        addItem({ id, item, quantity, price }) {
            cart.push({ id, item, quantity, price });
        },
        removeItem(id) {
            cart = cart.filter((el) => el.id !== id);
            console.log(cart);
        },
        updateQuantity({ id, quantity }) {
            cart.forEach((el) => {
                if (el.id === id) {
                    el.quantity = quantity;
                }
            });
            console.log(cart);
        },
        getItems() {
            let items = [];
            if (cart !== [])
                cart.forEach((el) => {
                    items.push({ item: el.item, quantity: el.quantity });
                });
            return items;
        },
        getTotal() {
            let total = 0;
            cart.forEach((el) => {
                total += el.quantity * el.price;
            });
            return total;
        },
        clear() {
            cart = [];
        },
    };
})();
CartModule.addItem({ id: 1, item: "BANANA", price: 100, quantity: 3 });
CartModule.addItem({ id: 2, item: "APPLE", price: 200, quantity: 4 });
CartModule.addItem({ id: 3, item: "ORANGE", price: 50, quantity: 5 });
CartModule.updateQuantity({ id: 2, quantity: 5 });
console.log(CartModule.getItems());
console.log(CartModule.getTotal());
CartModule.removeItem(2);
console.log(CartModule.getItems());
console.log(CartModule.getTotal());
CartModule.clear();
console.log(CartModule.getItems());
console.log(CartModule.getTotal());
