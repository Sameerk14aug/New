// Shopping cart functionality
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize buy buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', handlePurchase);
    });

    // Add hover effects to product boxes
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => {
        box.addEventListener('mouseenter', handleHover);
        box.addEventListener('mouseleave', handleHoverExit);
    });
});

function handlePurchase(event) {
    const productBox = event.target.closest('.product-box');
    const productInfo = {
        name: productBox.querySelector('h3').textContent,
        price: productBox.querySelector('.price').textContent,
        description: productBox.querySelector('.description').textContent
    };

    cart.push(productInfo);
    updateCart();
    
    // Animation feedback
    const button = event.target;
    button.textContent = 'Added to Cart!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = 'Book Now';
        button.style.background = 'linear-gradient(to right, #FF0000, #800000)';
    }, 2000);
}

function handleHover(event) {
    const box = event.currentTarget;
    box.style.transform = 'scale(1.05)';
    box.style.transition = 'transform 0.3s ease';
}

function handleHoverExit(event) {
    const box = event.currentTarget;
    box.style.transform = 'scale(1)';
}

function updateCart() {
    const cartIcon = document.querySelector('.fa-ticket-alt');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cart.length);
        
        // Add visual feedback
        cartIcon.style.animation = 'cartBounce 0.5s ease';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 500);
    }
}

// Add this CSS animation to your theatre.css file
/*
@keyframes cartBounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
*/
