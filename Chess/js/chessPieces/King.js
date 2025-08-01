import { ChessPiece } from "./chessPiece.js";

export class King extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
        this.check = false;
    }

    getAvailableMoves(chessBoard) {
        const moves = [];

        const directions = [
            { row: 0, col: 1 },
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: -1 },
            { row: -1, col: 0 },
            { row: -1, col: -1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
        ]

        directions.forEach(direction => {
            let newRow = this.position[0] + direction.row;
            let newCol = this.position[1] + direction.col;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && chessBoard.board[newRow][newCol] === undefined) {
                moves.push([newRow, newCol]);
            }
        })

        return moves;
    }

    getAvailableAttack(chessBoard) {
        const attack = [];

        const directions = [
            { row: 0, col: 1 },
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: -1 },
            { row: -1, col: 0 },
            { row: -1, col: -1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
        ]

        directions.forEach(direction => {
            let newRow = this.position[0] + direction.row;
            let newCol = this.position[1] + direction.col;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && chessBoard.board[newRow][newCol] !== undefined && chessBoard.board[newRow][newCol].color !== this.color) {
                attack.push([newRow, newCol]);
            }
        })

        return attack;
    }
}
