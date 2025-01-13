const cards = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓',
    '🍒', '🍒', '🥝', '🥝', '🍍', '🍍', '🍉', '🍉'
];
let moves = 0;
let timer = 0;
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

const board = document.querySelector('.game-board');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const newGameButton = document.getElementById('newGame');

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = '';
    shuffleCards();
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    board.style.gridTemplateColumns = `repeat(4, 1fr)`;
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
    } else {
        checkMatch(this);
    }
}

function checkMatch(secondCard) {
    moves++;
    movesElement.textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            alert('Congratulations! You matched all pairs.');
        }

        firstCard = null;
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard = null;
            lockBoard = false;
        }, 1000);
    }
}

function startTimer() {
    timer = 0;
    timeElement.textContent = timer;
    setInterval(() => {
        timer++;
        timeElement.textContent = timer;
    }, 1000);
}

newGameButton.addEventListener('click', () => {
    moves = 0;
    matchedPairs = 0;
    lockBoard = false;
    movesElement.textContent = moves;
    createBoard();
});

createBoard();
startTimer();
