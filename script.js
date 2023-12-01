let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

document.getElementById('board').addEventListener('click', handleCellClick);
document.getElementById('resetBtn').addEventListener('click', resetGame);

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer === 'X' ? 'player1' : 'player2');

        if (checkWinner()) {
            displayMessage(`Player ${currentPlayer} wins! 🎉`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            displayMessage("It's a tie!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            displayMessage(`Player ${currentPlayer}'s turn`);
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;

    // Show pop-up message
    messageElement.style.display = 'block';

    // Hide the pop-up message after 3 seconds
   // setTimeout(() => {
     //   messageElement.style.display = 'none';
    //}, 3000);
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('message').textContent = "Player X's turn";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player1', 'player2');
    });
}
