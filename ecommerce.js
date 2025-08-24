document.addEventListener('DOMContentLoaded', () => {
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let cart = [];
    let total = 0;

    // Function to update the cart display
    function updateCart() {
        cartItemsList.innerHTML = '';
        total = 0; // Reset total
        let totalItems = 0; // Reset total items

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        }

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
            totalItems += item.quantity;
        });

        cartCountEl.textContent = totalItems;
        cartTotalEl.textContent = total.toFixed(2);
    }

    // Add event listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                // If item exists, just increase quantity
                existingItem.quantity++;
            } else {
                // If item is new, add it to the cart with quantity 1
                const newItem = {
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                cart.push(newItem);
            }
            
            updateCart();
            alert(`${productName} has been added to your cart!`);
        });
    });

    // Add event listener to the checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}.`);
            // Reset the cart after "checkout"
            cart = [];
            total = 0;
            updateCart();
        } else {
            alert("Your cart is empty. Please add some products.");
        }
    });

    // Initial call to set up the page
    updateCart();
});