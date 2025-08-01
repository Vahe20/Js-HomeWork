import { ChessPiece } from "./chessPiece.js";

export class Knight extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
    }

    getAvailableMoves(chessBoard) {
        const moves = [];

        const directions = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 },
        ];

        directions.forEach(direction => {
            let newRow = direction.row + this.position[0];
            let newCol = direction.col + this.position[1];

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && chessBoard.board[newRow][newCol] === undefined) {
                moves.push([newRow, newCol]);
            }
        });

        return moves;
    }

    getAvailableAttack(chessBoard) {
        const attack = [];

        const directions = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 },
        ];

        directions.forEach(direction => {
            let newRow = direction.row + this.position[0];
            let newCol = direction.col + this.position[1];

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && chessBoard.board[newRow][newCol] !== undefined && chessBoard.board[newRow][newCol].color !== this.color) {
                attack.push([newRow, newCol]);
            }
        });

        return attack;
    }
}