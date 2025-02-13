// Sample data for search results
const searchData = {
    shows: [
        { title: 'The Phantom of the Opera', type: 'shows', image: 'The-Phantom-of-the-Opera-His-Majestys-Theatre.webp', description: 'By Andrew Lloyd Webber' },
        { title: 'Moulin Rouge', type: 'shows', image: 'scene-moulin-rouge.jpg', description: 'By Baz Luhrmann & Craig Pearce' },
        { title: 'Hamilton', type: 'shows', image: 'hamilton-theatre-marquee.jpg', description: 'By Alexander Hamilton' },
        { title: 'The Lion King', type: 'shows', image: 'download (35).jpeg', description: 'By Disney Theatrical Productions' }
    ],
    artists: [
        { title: 'Andrew Lloyd Webber', type: 'artists', image: 'images.jpeg', description: 'Composer' },
        { title: 'Lin-Manuel Miranda', type: 'artists', image: 'download (33).jpeg', description: 'Actor, Composer' },
        { title: 'Julie Andrews', type: 'artists', image: 'download (36).jpeg', description: 'Actress, Singer' },
        { title: 'Stephen Sondheim', type: 'artists', image: 'download (37).jpeg', description: 'Composer, Lyricist' }
    ],
    events: [
        { title: 'Theatre Workshop', type: 'events', image: 'images (1).jpeg', description: 'Interactive theatre workshop' },
        { title: 'Summer Festival', type: 'events', image: 'download (34).jpeg', description: 'Annual theatre festival' },
        { title: 'Broadway Night', type: 'events', image: 'download (38).jpeg', description: 'Special Broadway performances' },
        { title: 'Drama Masterclass', type: 'events', image: 'download (39).jpeg', description: 'Learn from theatre experts' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    // Initial display
    displayResults(getAllItems());

    // Search input handler
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredResults = filterResults(searchTerm);
        displayResults(filteredResults);
    });

    // Filter buttons handler
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            const searchTerm = searchInput.value.toLowerCase();
            const filteredResults = filterResults(searchTerm);
            displayResults(filteredResults);
        });
    });

    function getAllItems() {
        return [
            ...searchData.shows,
            ...searchData.artists,
            ...searchData.events
        ];
    }

    function filterResults(searchTerm) {
        let items = getAllItems();
        
        // Apply type filter
        if (currentFilter !== 'all') {
            items = items.filter(item => item.type === currentFilter);
        }

        // Apply search term filter
        if (searchTerm) {
            items = items.filter(item => 
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );
        }

        return items;
    }

    function displayResults(results) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; color: white;">
                    No results found
                </div>
            `;
            return;
        }

        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p class="type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                <button class="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            `;

            // Add click handler for the Add to Cart button
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', function() {
                this.classList.add('added');
                this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
                setTimeout(() => {
                    this.classList.remove('added');
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                }, 2000);
            });

            searchResults.appendChild(card);
        });
    }
});
