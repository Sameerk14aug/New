document.addEventListener('DOMContentLoaded', function() {
    // Show data
    const shows = {
        'A': { 
            title: 'The Phantom of the Opera',
            date: '2024-02-20',
            time: '19:30',
            price: 34.99,
            banner: 'phantom-banner.jpg'
        },
        // ...existing show data...
    };

    // Get show ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('show') || 'A';
    const currentShow = shows[showId];

    // Update show details with animation
    function updateShowDetails() {
        const title = document.getElementById('showTitle');
        const date = document.getElementById('showDate');
        const time = document.getElementById('showTime');
        const priceElement = document.getElementById('pricePerTicket');

        title.style.opacity = '0';
        date.style.opacity = '0';
        time.style.opacity = '0';

        setTimeout(() => {
            title.textContent = currentShow.title;
            date.innerHTML = `<i class="far fa-calendar"></i> Date: ${currentShow.date}`;
            time.innerHTML = `<i class="far fa-clock"></i> Time: ${currentShow.time}`;
            priceElement.textContent = currentShow.price.toFixed(2);

            title.style.opacity = '1';
            date.style.opacity = '1';
            time.style.opacity = '1';
        }, 300);
    }

    // Generate seats with animation
    function generateSeats() {
        const seatsContainer = document.getElementById('seatsContainer');
        const totalSeats = 60;
        const delay = 20;

        for (let i = 0; i < totalSeats; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.seatNumber = i + 1;
            
            // Random seat status
            const random = Math.random();
            if (random < 0.3) {
                seat.classList.add('occupied');
            } else {
                seat.classList.add('available');
            }

            // Animation delay
            seat.style.opacity = '0';
            seat.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                seat.style.opacity = '1';
                seat.style.transform = 'scale(1)';
            }, i * delay);

            seat.addEventListener('click', handleSeatClick);
            seatsContainer.appendChild(seat);
        }
    }

    function handleSeatClick(event) {
        const seat = event.target;
        if (seat.classList.contains('occupied')) return;

        seat.classList.toggle('selected');
        seat.classList.toggle('available');

        // Add clicking effect
        seat.style.transform = 'scale(0.9)';
        setTimeout(() => {
            seat.style.transform = seat.classList.contains('selected') ? 'scale(1.1)' : 'scale(1)';
        }, 150);

        updateBookingSummary();
    }

    function updateBookingSummary() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.dataset.seatNumber);
        const totalAmount = selectedSeats.length * currentShow.price;

        const summaryElement = document.getElementById('selectedSeatsText');
        const totalElement = document.getElementById('totalAmount');

        // Animate total amount
        const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
        animateNumber(currentTotal, totalAmount, (value) => {
            totalElement.textContent = `$${value.toFixed(2)}`;
        });

        summaryElement.textContent = selectedSeatsArray.length > 0 ? 
            selectedSeatsArray.join(', ') : 'None';
    }

    function animateNumber(start, end, callback) {
        const duration = 500;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const value = start + (end - start) * progress;
            callback(value);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Initialize page
    updateShowDetails();
    generateSeats();

    // Book button handler
    document.getElementById('bookButton').addEventListener('click', function() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat to proceed.');
            return;
        }

        this.classList.add('booking');
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            alert('Proceeding to payment gateway...');
            this.classList.remove('booking');
            this.innerHTML = '<span class="button-text">Proceed to Payment</span><i class="fas fa-arrow-right"></i>';
        }, 1500);
    });
});
