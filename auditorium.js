document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('seating-modal');
    const viewSeatsButtons = document.querySelectorAll('.view-seats-btn');
    const closeBtn = document.querySelector('.close-btn');
    const seatingLayout = document.querySelector('.seating-layout');

    const createSeatingLayout = (rows, cols, hallName) => {
        let layout = `<h3>${hallName}</h3><div class="screen">STAGE</div>`;
        for (let i = 0; i < rows; i++) {
            layout += '<div class="row">';
            for (let j = 0; j < cols; j++) {
                layout += `<div class="seat" data-row="${i}" data-col="${j}"></div>`;
            }
            layout += '</div>';
        }
        return layout;
    };

    viewSeatsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const hallName = e.target.parentElement.querySelector('h2').textContent;
            let rows, cols;

            switch(hallName) {
                case 'Main Hall':
                    rows = 25;
                    cols = 30;
                    break;
                case 'Intimate Theatre':
                    rows = 15;
                    cols = 20;
                    break;
                case 'Experimental Space':
                    rows = 10;
                    cols = 15;
                    break;
                case 'Black Box Theatre':
                    rows = 8;
                    cols = 12;
                    break;
                default:
                    rows = 10;
                    cols = 10;
            }

            seatingLayout.innerHTML = createSeatingLayout(rows, cols, hallName);
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add seat selection functionality
    seatingLayout.addEventListener('click', (e) => {
        if (e.target.classList.contains('seat')) {
            e.target.classList.toggle('selected');
        }
    });
});

// Add these styles to your CSS file
const styles = `
.screen {
    width: 80%;
    height: 30px;
    margin: 20px auto;
    background: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}

.row {
    display: flex;
    justify-content: center;
    margin: 5px 0;
}

.seat {
    width: 20px;
    height: 20px;
    margin: 3px;
    background: #444;
    border-radius: 3px;
    cursor: pointer;
}

.seat:hover {
    background: #666;
}

.seat.selected {
    background: #ff4d4d;
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
