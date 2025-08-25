import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";


export class Pawn extends ChessPiece {
    constructor(color: Types.typePlaceColor, type: Types.typePiece, position: Types.position, img: string) {
        super(color, type, position, img);
    }

    getAvailableMoves(chessBoard: ChessBoard) {
        const moves: Types.position[] = [];

        const direction = this.color === "white" ? 1 : -1;
        const row = this.position.row;
        const col = this.position.col;

        if (chessBoard.board[row + direction]?.[col] === undefined) {
            moves.push({ row: row + direction, col: col });

            const pos = this.color === "white" ? 1 : 6;
            if (row === pos && chessBoard.board[row + direction + direction]?.[col] === undefined) {
                moves.push({ row: row + direction + direction, col: col });
            }
        }

        if (col + 1 < 8 && chessBoard.board[row + direction]?.[col + 1] !== undefined) {
            const tmp = chessBoard.board[row + direction]?.[col + 1];

            if (tmp && tmp.getColor() !== this.color) { 
                moves.push( {row: row + direction, col: col + 1} );
            }
        }

        if (col - 1 >= 0 && chessBoard.board[row + direction]?.[col - 1] !== undefined) {
            const tmp = chessBoard.board[row + direction]?.[col - 1];

            if (tmp && tmp.getColor() !== this.color) { 
                moves.push( {row: row + direction, col: col - 1} );
            }
        }

        return moves;
    }

    clone(): ChessPiece | undefined {
        return new Pawn(this.color, this.type, {row: this.position.row, col: this.position.col}, this.img);
    }
}

