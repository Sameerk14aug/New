document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Update order summary
    document.getElementById('showTitle').textContent = params.get('title');
    document.getElementById('selectedSeats').textContent = params.get('seats');
    document.getElementById('ticketCount').textContent = params.get('quantity');
    document.getElementById('totalAmount').textContent = params.get('total');

    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formatted.substring(0, 19);
    });

    // Expiry date formatting
    document.getElementById('expiryDate').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value.substring(0, 5);
    });

    // Form submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;

        if (cardNumber.length !== 16) {
            alert('Please enter a valid card number');
            return;
        }

        if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return;
        }

        if (cvv.length !== 3) {
            alert('Please enter a valid CVV');
            return;
        }

        if (!cardName.trim()) {
            alert('Please enter the cardholder name');
            return;
        }

        // Simulate payment processing
        alert('Payment successful! Redirecting to confirmation page...');
        // Add redirect to confirmation page
    });
});

document.addEventListener('DOMContentLoaded', function() {
    try {
        const params = new URLSearchParams(window.location.search);
        
        // Display order details
        document.getElementById('showTitle').textContent = params.get('title') || 'N/A';
        document.getElementById('selectedSeats').textContent = params.get('seats') || 'N/A';
        document.getElementById('ticketCount').textContent = params.get('quantity') || '0';
        document.getElementById('totalAmount').textContent = params.get('total') || '0.00';
        document.getElementById('showImage').src = params.get('image');
        document.getElementById('showDescription').textContent = params.get('description');
    } catch (error) {
        console.error('Error displaying order details:', error);
    }
});