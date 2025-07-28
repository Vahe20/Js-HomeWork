import { ChessBoard } from './chess_board.js';
import { ChessPiece } from './chessPieces/chessPiece.js';
import { Pawn } from "./chessPieces/Pawn.js";
import { Rook } from "./chessPieces/Rook.js";
import { Bishop } from "./chessPieces/Bishop.js";
import { Knight } from "./chessPieces/Knight.js";
import { Queen } from "./chessPieces/Queen.js";
import { King } from "./chessPieces/King.js";



function renderBoard(chessBoard) {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const cell = document.querySelector(`.cell-${i}-${j}`);
            const piece = chessBoard.board[i][j];
            if (piece) {
                cell.innerHTML = `<img src="${piece.img}" alt="${piece.type}">`;
            } else {
                cell.innerHTML = '';
            }
        }
    }
}


function clearSelectedCell() {
    for (let i = 1; i <= 8; ++i) {
        for (let j = 1; j <= 8; ++j) {
            document.querySelector(`.cell-${i}-${j}`).id = "";
        }
    }
}

function availableMoves(row, col) {
    const cell = chessBoard.board[row][col];
    const av_cells = cell.getAvailableMoves(chessBoard);

    // console.log(av_cells);

    av_cells.forEach((value) => {
        document.querySelector(`.cell-${value[0]}-${value[1]}`).id = "available_cell";
    })
}

function availableAttack(row, col) {
    const cell = chessBoard.board[row][col];
    const av_cells = cell.getAvailableAttack(chessBoard);

    if (av_cells === undefined) return;
    av_cells.forEach((value) => {
        document.querySelector(`.cell-${value[0]}-${value[1]}`).id = "attack_cell";
    })
}


document.querySelector('.board').addEventListener('click', (event) => {
    const cell = event.target.closest('.board_cell');
    if (!cell) return;

    const match = [...cell.classList].find(cls => cls.startsWith('cell-'));
    if (!match) return;

    const [, row, col] = match.split('-').map(Number);

    if (document.querySelector(`.${match}`).id === "available_cell" 
    || document.querySelector(`.${match}`).id === "attack_cell") {
        clearSelectedCell();

        chessBoard.board[selectedPiecePos[0]][selectedPiecePos[1]] = undefined;
        selectedPiece.position = [row, col];
        chessBoard.board[row][col] = selectedPiece;

        renderBoard(chessBoard);

        selectedPiece = null;
        selectedPiecePos = null;

        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';

        return;
    }

    if (chessBoard.board[row][col] === undefined) {
        clearSelectedCell();

        selectedPiece = null;
        selectedPiecePos = null;

        return;
    }

    clearSelectedCell();

    if (chessBoard.board[row][col].color !== currentPlayer) {
        return;
    }

    selectedPiece = chessBoard.board[row][col];
    selectedPiecePos = [row, col];
    
    availableMoves(row, col);
    availableAttack(row, col);
});

let chessBoard = new ChessBoard();
let currentPlayer = 'white';
let selectedPiece = null;
let selectedPiecePos = null;

function start() {

    chessBoard.board[1][1] = new Rook('white', 'Rook', [1, 1], 'images/white_rook.png');
    // chessBoard.board[1][2] = new Knight('white', 'Knight', [1, 2], 'images/white_knight.png');
    // chessBoard.board[1][3] = new Bishop('white', 'Bishop', [1, 3], 'images/white_bishop.png');
    // chessBoard.board[1][4] = new Queen('white', 'Queen', [1, 4], 'images/white_queen.png');
    // chessBoard.board[1][5] = new King('white', 'King', [1, 5], 'images/white_king.png');
    // chessBoard.board[1][6] = new Bishop('white', 'Bishop', [1, 6], 'images/white_bishop.png');
    // chessBoard.board[1][7] = new Knight('white', 'Knight', [1, 7], 'images/white_knight.png');
    chessBoard.board[1][8] = new Rook('white', 'Rook', [1, 8], 'images/white_rook.png');

    for (let i = 1; i <= 8; i++) {
        chessBoard.board[2][i] = new Pawn('white', 'Pawn', [2, i], 'images/white_pawn.png');
        chessBoard.board[7][i] = new Pawn('black', 'Pawn', [7, i], 'images/black_pawn.png');
    }

    chessBoard.board[8][1] = new Rook('black', 'Rook', [8, 1], 'images/black_rook.png');
    // chessBoard.board[8][2] = new Knight('black', 'Knight', [8, 2], 'images/black_knight.png');
    // chessBoard.board[8][3] = new Bishop('black', 'Bishop', [8, 3], 'images/black_bishop.png');
    // chessBoard.board[8][4] = new Queen('black', 'Queen', [8, 4], 'images/black_queen.png');
    // chessBoard.board[8][5] = new King('black', 'King', [8, 5], 'images/black_king.png');
    // chessBoard.board[8][6] = new Bishop('black', 'Bishop', [8, 6], 'images/black_bishop.png');
    // chessBoard.board[8][7] = new Knight('black', 'Knight', [8, 7], 'images/black_knight.png');
    chessBoard.board[8][8] = new Rook('black', 'Rook', [8, 8], 'images/black_rook.png');

    renderBoard(chessBoard);
}

start();

