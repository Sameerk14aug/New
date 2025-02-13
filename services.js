document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for service buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageSection = document.querySelector('.premium-services');
            packageSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Package selection handling
    const packageButtons = document.querySelectorAll('.package-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.parentElement.querySelector('h3').textContent;
            const packagePrice = this.parentElement.querySelector('.price').textContent;
            
            alert(`Thank you for selecting the ${packageName}!\nPrice: ${packagePrice}\nOur team will contact you shortly.`);
        });
    });

    // Animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    serviceCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});
