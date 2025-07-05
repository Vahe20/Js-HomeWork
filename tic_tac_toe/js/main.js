class TicTacToe {
    board;
    currentPlayer;
    winner;

    constructor() {
        this.initializeGame();
    }

    initializeGame() {
        this.board = Array.from({ length: 3 }, () => Array(3).fill(''));
        this.currentPlayer = 'X';
        this.winner = null;
        this.updateStatus('');
    }

    handleCellClick(row, col) {
        if (this.board[row][col] === '' && !this.winner) {
            this.board[row][col] = this.currentPlayer;
            this.checkWinner();
            if (!this.winner && !this.isDraw()) {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    renderBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                cell.textContent = this.board[i][j];
            }
        }
    }

    checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][0] === this.board[i][2]) {
                this.setWinner(this.board[i][0]);
                return;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (this.board[0][j] && this.board[0][j] === this.board[1][j] && this.board[0][j] === this.board[2][j]) {
                this.setWinner(this.board[0][j]);
                return;
            }
        }

        if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
            this.setWinner(this.board[0][0]);
            return;
        }

        if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
            this.setWinner(this.board[0][2]);
            return;
        }

        if (this.isDraw()) {
            this.updateStatus('It\'s a draw!');
        }
    }

    setWinner(player) {
        this.winner = player;
        this.updateStatus(`Player ${player} wins!`);
        const scoreElement = document.getElementById(`score_${player.toLowerCase()}`);
        scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
    }


    isDraw() {
        return this.board.every(row => row.every(cell => cell !== ''));
    }

    updateStatus(message) {
        const status = document.getElementById("status");
        status.textContent = message;
    }
}

document.getElementById("restart").addEventListener("click", () => {
    game.initializeGame();
    game.renderBoard();
    for (const cell of document.getElementsByClassName("cell")) {
        cell.style.fontSize = '0px';
    }
});


const game = new TicTacToe();
game.initializeGame();
game.renderBoard();


function handleCellClick(row, col) {
    game.handleCellClick(row, col);
    game.renderBoard();

    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.style.fontSize = '100px';
}