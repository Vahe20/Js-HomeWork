import { Pawn } from "./chessPieces/Pawn.js";
import { Rook } from "./chessPieces/Rook.js";
import { Bishop } from "./chessPieces/Bishop.js";
import { Knight } from "./chessPieces/Knight.js";
import { Queen } from "./chessPieces/Queen.js";
import { King } from "./chessPieces/King.js";
import { Render } from './render.js';

export function start(chessBoard) {
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
                    king.check = true;
                    return true;
                }
            }
        }
    }

    return false;
}
