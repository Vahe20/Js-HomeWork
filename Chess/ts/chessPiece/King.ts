import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";


export class King extends ChessPiece {
    // check: boolean;

    constructor(color: Types.typePlaceColor, type: Types.typePiece, position: Types.position, img: string) {
        super(color, type, position, img);
        // this.check = false;
    }

    getAvailableMoves(chessBoard: ChessBoard) {
        const moves: Types.position[] = [];

        const directions = [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: 1 },
            { row: -1, col: 1 },
            { row: -1, col: 0 },
            { row: -1, col: -1 },
            { row: 0, col: -1 },
            { row: 1, col: -1 },
        ]

        directions.forEach(direction => {
            let newRow = this.position.row + direction.row;
            let newCol = this.position.col + direction.col;

            const field = chessBoard.board[newRow]?.[newCol];

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                if (field?.getColor() !== this.color)
                    moves.push({ row: newRow, col: newCol });
            }
        })


        return moves;
    }

    clone(): ChessPiece | undefined {
        return new King(this.color, this.type, {row: this.position.row, col: this.position.col}, this.img);
    }
}
