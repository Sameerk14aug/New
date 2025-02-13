document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    document.getElementById('showImage').src = params.get('image');
    document.getElementById('showTitle').textContent = params.get('title');
    document.getElementById('showDescription').textContent = params.get('description');
    document.getElementById('showPrice').textContent = `$${params.get('price')}`;
});

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get DOM elements with error handling
        const seatSelect = document.getElementById('tier1');
        const quantitySelect = document.getElementById('ticketQuantity');
        const selectedSeatSpan = document.getElementById('selectedSeat');
        const ticketCountSpan = document.getElementById('ticketCount');
        const totalAmountSpan = document.getElementById('totalAmount');

        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const showTitle = params.get('title');
        const showPrice = parseFloat(params.get('price'));
        const showImage = params.get('image');
        const showDescription = params.get('description');

        // Update show details if parameters exist
        if (showTitle && showPrice) {
            document.getElementById('showImage').src = showImage;
            document.getElementById('showTitle').textContent = showTitle;
            document.getElementById('showDescription').textContent = showDescription;
        }

        function calculateTotal() {
            const selectedSeat = seatSelect.value;
            const quantity = parseInt(quantitySelect.value) || 0;
            
            selectedSeatSpan.textContent = selectedSeat || 'None';
            ticketCountSpan.textContent = quantity;

            if (showPrice && quantity) {
                const total = showPrice * quantity;
                totalAmountSpan.textContent = total.toFixed(2);
            } else {
                totalAmountSpan.textContent = '0.00';
            }
        }

        // Add event listeners
        seatSelect.addEventListener('change', calculateTotal);
        quantitySelect.addEventListener('change', calculateTotal);
        
    } catch (error) {
        console.error('Error in booking.js:', error);
    }
});

document.getElementById('proceedToPayment').addEventListener('click', function() {
    window.location.href = 'payment.html';
});
