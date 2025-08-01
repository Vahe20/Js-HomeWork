import { ChessPiece } from "./chessPiece.js";

export class Bishop extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
    }

    getAvailableMoves(chessBoard) {
        const moves = [];

        const directions = [
            { row: 1, col: 1 },
            { row: -1, col: -1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 }
        ]

        directions.forEach(direction => {
            let newRow = this.position[0] + direction.row;
            let newCol = this.position[1] + direction.col;

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if (chessBoard.board[newRow][newCol] !== undefined) {
                    break;
                }
                moves.push([newRow, newCol]);
                newRow += direction.row;
                newCol += direction.col;
            }
        })

        return moves;
    }

    getAvailableAttack(chessBoard) {
        const attack = [];

        const directions = [
            { row: 1, col: 1 },
            { row: -1, col: -1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 }
        ]

        directions.forEach(direction => {
            let newRow = this.position[0] + direction.row;
            let newCol = this.position[1] + direction.col;

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if (chessBoard.board[newRow][newCol] !== undefined && chessBoard.board[newRow][newCol].color !== this.color) {
                    attack.push([newRow, newCol]);
                    break;
                } else if (chessBoard.board[newRow][newCol] !== undefined) break;
                
                newRow += direction.row;
                newCol += direction.col;
            }
        });

        return attack;
    }
}
