import { ChessPiece } from "./chessPiece.js";

export class Pawn extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
    }

    getAvailableMoves(chessBoard) {
        const moves = [];
        const direction = this.color === "white" ? 1 : -1;
        const startRow = this.color === "white" ? 1 : 6;

        if (chessBoard.board[this.position[0] + direction]) {
            if (chessBoard.board[this.position[0] + direction][this.position[1]] === undefined) {
                moves.push([this.position[0] + direction, this.position[1]]);

                if (this.position[0] === startRow && chessBoard.board[this.position[0] + 2 * direction][this.position[1]] === undefined) {
                    moves.push([this.position[0] + 2 * direction, this.position[1]]);
                }
            }
        }

        return moves;
    }
    getAvailableAttack(chessBoard) {
        const attack = [];

        if (this.color === "white") {
            if (this.position[1] + 1 < 8 && chessBoard.board[this.position[0] + 1] && chessBoard.board[this.position[0] + 1][this.position[1] + 1] && chessBoard.board[this.position[0] + 1][this.position[1] + 1].color === "black") {
                attack.push([ this.position[0] + 1, this.position[1] + 1 ]);
            }

            if (this.position[1] - 1 >= 0 && chessBoard.board[this.position[0] + 1] && chessBoard.board[this.position[0] + 1][this.position[1] - 1] && chessBoard.board[this.position[0] + 1][this.position[1] - 1].color === "black") {
                attack.push([ this.position[0] + 1, this.position[1] - 1 ]);
            }
        }

        if (this.color === "black") {
            if (this.position[1] + 1 < 8 && chessBoard.board[this.position[0] - 1] && chessBoard.board[this.position[0] - 1][this.position[1] + 1] && chessBoard.board[this.position[0] - 1][this.position[1] + 1].color === "white") {
                attack.push([ this.position[0] - 1, this.position[1] + 1 ]);
            }

            if (this.position[1] - 1 >= 0 && chessBoard.board[this.position[0] - 1] && chessBoard.board[this.position[0] - 1][this.position[1] - 1] && chessBoard.board[this.position[0] - 1][this.position[1] - 1].color === "white") {
                attack.push([ this.position[0] - 1, this.position[1] - 1 ]);
            }
        }

        return attack;
    }
}

