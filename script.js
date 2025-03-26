document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const container = document.querySelector('.game-container');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const emojis = {
        win: ['🥳', '🏆', '🎉', '✨', '👑'],
        draw: ['🤝', '😐', '🔄']
    };

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (gameState[index] !== '' || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        
        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                highlightWin(condition);
                break;
            }
        }

        if (roundWon) {
            const winEmoji = emojis.win[Math.floor(Math.random() * emojis.win.length)];
            status.innerHTML = `Player ${currentPlayer} wins! ${winEmoji}`;
            gameActive = false;
            createConfetti();
            return;
        }

        if (!gameState.includes('')) {
            const drawEmoji = emojis.draw[Math.floor(Math.random() * emojis.draw.length)];
            status.innerHTML = `Game ended in a draw! ${drawEmoji}`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function highlightWin(cellsToHighlight) {
        cellsToHighlight.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }

    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});