import { ChessBoard } from "./chess_board.js";
import { Pawn } from "./chessPiece/Pawn.js";
import { Rook } from "./chessPiece/Rook.js";
import { Knight } from "./chessPiece/Knight.js";
import { Bishop } from "./chessPiece/Bishop.js";
import { Queen } from "./chessPiece/Queen.js";
import { King } from "./chessPiece/King.js";

import { Render } from "./render.js";
import * as Types from "./globalTypes.js";


export function start(chessBoard: ChessBoard) {
    if (!chessBoard || !chessBoard.board) return;
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessBoard.board[i]![j] = undefined;
        }
    }
    
    const setupRow = (row: number, color: Types.typePlaceColor, imgPrefix: string) => {
        chessBoard.board[row]![0] = new Rook(color, 'rook', {row: row, col: 0}, `images/${imgPrefix}_rook.png`);
        chessBoard.board[row]![1] = new Knight(color, 'knight', {row: row, col: 1}, `images/${imgPrefix}_knight.png`);
        chessBoard.board[row]![2] = new Bishop(color, 'bishop', {row: row, col: 2}, `images/${imgPrefix}_bishop.png`);
        chessBoard.board[row]![3] = new Queen(color, 'queen', {row: row, col: 3}, `images/${imgPrefix}_queen.png`);
        chessBoard.board[row]![4] = new King(color, 'king', {row: row, col: 4}, `images/${imgPrefix}_king.png`);
        chessBoard.board[row]![5] = new Bishop(color, 'bishop', {row: row, col: 5}, `images/${imgPrefix}_bishop.png`);
        chessBoard.board[row]![6] = new Knight(color, 'knight', {row: row, col: 6}, `images/${imgPrefix}_knight.png`);
        chessBoard.board[row]![7] = new Rook(color, 'rook', {row: row, col: 7}, `images/${imgPrefix}_rook.png`);
    }

    setupRow(0, 'white', 'white');
    setupRow(7, 'black', 'black');
    
    for (let i = 0; i < 8; i++) {
        chessBoard.board[1]![i] = new Pawn('white', 'pawn', {row: 1, col: i}, 'images/white_pawn.png');
        chessBoard.board[6]![i] = new Pawn('black', 'pawn', {row: 6, col: i}, 'images/black_pawn.png');
    }

    Render.renderBoard(chessBoard);
}

export function generateHtmlCells() {
    for (let i = 7; i >= 0; --i) {
        for (let j = 0; j < 8; ++j) {
            const cell = document.createElement('div');
            cell.classList.add('board_cell');
            cell.classList.add(`cell-${i}-${j}`);
            document.querySelector('.board')?.appendChild(cell);

            if ((i + j) % 2 === 0) {
                cell.classList.add('black_cell');
            }
        }
    }
}

export function isPawnPromotion(chessBoard: ChessBoard, row: number, col: number) {
    const piece = chessBoard.board[row]?.[col];
    return piece && piece.getType() === 'pawn' && (row === 0 || row === 7);
}

export function selectPiecePromotion() {
    
}

export function getKing(chessBoard: ChessBoard, color: Types.typePlaceColor) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.board[i]?.[j];
            if (piece && piece.getType() === 'king' && piece.getColor() === color) return piece;
        }
    }
}

export function isCheck(chessBoard: ChessBoard) {
    const currentPlayer = chessBoard.getCurrentPlayer();
    const king = getKing(chessBoard, currentPlayer);
    const kingPos = king?.getPosition();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.board[i]?.[j];
            if (piece && piece.getColor() !== currentPlayer) {
                const moves_pos = piece.getAvailableMoves(chessBoard);
                if (kingPos && moves_pos?.some((pos) => {
                    return pos.row === kingPos?.row && pos.col === kingPos?.col;
                })) {
                    Render.renderCheck(chessBoard, kingPos.row, kingPos.col);
                    return true;
                }
            }
        }
    }

    const tmp = document.querySelector(`.cell-${kingPos?.row}-${kingPos?.col}`);
    if (tmp) tmp.id = "";

    return false;    
}

export function isMath(chessBoard: ChessBoard) {
    const color = chessBoard.getCurrentPlayer();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.board[i]?.[j];
            if (piece && piece.getColor() === color) {
                const moves = piece.getAvailableMoves(chessBoard);
                if (moves?.some(pos => virtualBoard(chessBoard, { row: i, col: j }, pos))) {
                    return false;
                }
            }
        }
    }

    return true;
}

export function virtualBoard(chessBoard: ChessBoard, pos: Types.position, newPos: Types.position) {
    const virtualBoard = new ChessBoard(chessBoard.getCurrentPlayer());

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            virtualBoard.board[i]![j] = chessBoard.board[i]?.[j]?.clone();
            if (virtualBoard.board[i]?.[j]) {
                virtualBoard.board[i]![j]?.setPosition({ row: i, col: j });
            }
        }
    }
    
    virtualBoard.board[newPos.row]![newPos.col] = virtualBoard.board[pos.row]?.[pos.col];
    virtualBoard.board[newPos.row]?.[newPos.col]?.setPosition( {row: newPos.row, col: newPos.col} )
    virtualBoard.board[pos.row]![pos.col] = undefined;

    return !isCheck(virtualBoard);
}
