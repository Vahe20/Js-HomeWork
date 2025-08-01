import * as func from './func.js';

export class Render {
    static renderBoard(chessBoard) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.querySelector(`.cell-${i}-${j}`);
                const piece = chessBoard.board[i][j];
                if (piece) {
                    cell.innerHTML = `<img src="${piece.img}" draggable="false" alt="${piece.type}">`;
                } else {
                    cell.innerHTML = '';
                }
            }
        }
    }

    static availableMoves(chessBoard, row, col) {
        const cell = chessBoard.board[row][col];

        const av_cells = cell.getAvailableMoves(chessBoard);

        av_cells.forEach((value) => {
            document.querySelector(`.cell-${value[0]}-${value[1]}`).id = "available_cell";
        });
    }

    static availableAttack(chessBoard, row, col) {
        const cell = chessBoard.board[row][col];
        const av_cells = cell.getAvailableAttack(chessBoard);

        if (!av_cells) return;
        av_cells.forEach((value) => {
            document.querySelector(`.cell-${value[0]}-${value[1]}`).id = "attack_cell";
        });
    }

    static clearSelectedCell() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                document.querySelector(`.cell-${i}-${j}`).id = "";
            }
        }
    }
}