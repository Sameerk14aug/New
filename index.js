/* filepath: /C:/Users/SS COMPUTER/Desktop/E-Project/script.js */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.product-container');
    const products = document.querySelectorAll('.product');
    let currentIndex = 0;

    function updateSlide() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % products.length;
        updateSlide();
    }

    setInterval(nextSlide, 3000);
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = 'booking.html';
    });
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

/* filepath: /c:/Users/SS COMPUTER/Desktop/E-Project/index.js */
const shows = {
    'A': {
        title: 'The Phantom of the Opera',
        description: 'By Andrew Lloyd Webber',
        image: 'The-Phantom-of-the-Opera-His-Majestys-Theatre.webp',
        price: '34.99'
    },
    'B': {
        title: 'Moulin Rouge! The Musical',
        description: 'By Baz Luhrmann & Craig Pearce',
        image: 'scene-moulin-rouge.jpg',
        price: '24.99'
    },
    'C': {
        title: 'Hamilton',
        description: 'By Alexander Hamilton',
        image: 'hamilton-theatre-marquee.jpg',
        price: '29.99'
    },
    'D': {
        title: 'Schmigadoon',
        description: 'By Cinco Paul & Ken Daurio',
        image: 'schmigadoon.jpg',
        price: '17.99'
    },
    'E': {
        title: 'Oedipus Rex',
        description: 'By Andrew Lloyd Webber',
        image: 'R.jpg',
        price: '39.99'
    },
    'F': {
        title: 'Harry Potter and the Cursed Child',
        description: 'By Stephen Schwartz',
        image: 'harry.jpg',
        price: '59.99'
    }
};

document.querySelectorAll('.show-btn').forEach(button => {
    button.addEventListener('click', () => {
        const showId = button.getAttribute('data-show');
        const show = shows[showId];
        const params = new URLSearchParams({
            id: showId,
            title: show.title,
            description: show.description,
            image: show.image,
            price: show.price
        });
        window.location.href = `booking.html?${params.toString()}`;
    });
});