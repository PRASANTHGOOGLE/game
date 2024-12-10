const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create the game board
function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cardValues]);
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Flip card
function flipCard() {
    if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        setTimeout(checkMatch, 1000);
    }
}

// Check for a match
function checkMatch() {
    const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');

    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    } else {

        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Reset the game
resetButton.addEventListener('click', () => {
    cards = [];
    createBoard();
});

// Initialize the game
createBoard();
