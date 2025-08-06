import { Pawn } from "./chessPieces/Pawn.js";
import { Rook } from "./chessPieces/Rook.js";
import { Bishop } from "./chessPieces/Bishop.js";
import { Knight } from "./chessPieces/Knight.js";
import { Queen } from "./chessPieces/Queen.js";
import { King } from "./chessPieces/King.js";
import * as func from './func.js';
import { Render } from './render.js';

export function start(chessBoard) {

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessBoard.board[i][j] = undefined;
        }
    }

    const setupRow = (row, color, imgPrefix) => {
        chessBoard.board[row][0] = new Rook(color, 'Rook', [row, 0], `images/${imgPrefix}_rook.png`);
        chessBoard.board[row][1] = new Knight(color, 'Knight', [row, 1], `images/${imgPrefix}_knight.png`);
        chessBoard.board[row][2] = new Bishop(color, 'Bishop', [row, 2], `images/${imgPrefix}_bishop.png`);
        chessBoard.board[row][3] = new Queen(color, 'Queen', [row, 3], `images/${imgPrefix}_queen.png`);
        chessBoard.board[row][4] = new King(color, 'King', [row, 4], `images/${imgPrefix}_king.png`);
        chessBoard.board[row][5] = new Bishop(color, 'Bishop', [row, 5], `images/${imgPrefix}_bishop.png`);
        chessBoard.board[row][6] = new Knight(color, 'Knight', [row, 6], `images/${imgPrefix}_knight.png`);
        chessBoard.board[row][7] = new Rook(color, 'Rook', [row, 7], `images/${imgPrefix}_rook.png`);
    };

    setupRow(0, 'white', 'white');
    setupRow(7, 'black', 'black');

    for (let i = 0; i < 8; i++) {
        chessBoard.board[1][i] = new Pawn('white', 'Pawn', [1, i], 'images/white_pawn.png');
        chessBoard.board[6][i] = new Pawn('black', 'Pawn', [6, i], 'images/black_pawn.png');
    }

    Render.renderBoard(chessBoard);
}


export function generateHtmlCells() {
    for (let i = 7; i >= 0; --i) {
        for (let j = 7; j >= 0; --j) {
            const cell = document.createElement('div');
            cell.classList.add('board_cell');
            cell.classList.add(`cell-${i}-${j}`);
            document.querySelector('.board').appendChild(cell);

            if ((i + j) % 2 === 0) {
                cell.classList.add('black_cell');
            }
        }
    }
}

export function getKing(chessBoard, color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.board[i][j];
            if (piece && piece.type === 'King' && piece.color === color) return chessBoard.board[i][j];
        }
    }
}


export function isCheck(chessBoard, color) {
    const king = getKing(chessBoard, color);
    const kingPos = king.position;
    king.check = false;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.board[i][j];
            if (piece && piece.color !== color) {
                const attack_pos = piece.getAvailableAttack(chessBoard);
                if (attack_pos.some((value) => {
                    return value[0] === kingPos[0] && value[1] === kingPos[1];
                })) {
                    king.check = false;
                    document.querySelector(`.cell-${kingPos[0]}-${kingPos[1]}`).id = "check_cell";
                    return true;
                }
            }
        }
    }

    document.querySelector(`.cell-${kingPos[0]}-${kingPos[1]}`).id = "";
    return false;
}

export function isMath(chessBoard, color) {
    let math = true;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.board[i][j];
            if (piece && piece.color === color) {
                const moves_pos = piece.getAvailableMoves(chessBoard).filter((value) => {
                    return func.virtualBoard(chessBoard, piece.color, i, j, value[0], value[1]);
                });

                const attack_pos = piece.getAvailableAttack(chessBoard).filter((value) => {
                    return func.virtualBoard(chessBoard, piece.color, i, j, value[0], value[1]);
                });

                if (moves_pos.length > 0 || attack_pos.length > 0) {
                    math = false;
                    return;
                }
            }
        }
    }

    if (math) {
        const menu = document.querySelector('.menu');
        const winner = color === 'white' ? 'Black' : 'White';
        menu.style.transform = 'scale(1)';
        document.getElementById('winner').textContent = `${winner} wins!`;
        return;
    }
}

export function virtualBoard(chessBoard, color, row, col, newRow, newCol) {
    const virtualBoard = {
        board: Array.from(Array(8), () => new Array(8))
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            virtualBoard.board[i][j] = chessBoard.board[i][j];
            if (virtualBoard.board[i][j]) {
                virtualBoard.board[i][j].position = [i, j];
            }
        }
    }

    const piece = virtualBoard.board[row][col];
    virtualBoard.board[row][col] = undefined;
    virtualBoard.board[newRow][newCol] = piece;
    piece.position = [newRow, newCol];

    const check = !isCheck(virtualBoard, color);

    piece.position = [row, col];

    return check;
}
