import { ChessPiece } from "./chessPiece.js";
export class King extends ChessPiece {
    // check: boolean;
    constructor(color, type, position, img) {
        super(color, type, position, img);
        // this.check = false;
    }
    getAvailableMoves(chessBoard) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: 1 },
            { row: -1, col: 1 },
            { row: -1, col: 0 },
            { row: -1, col: -1 },
            { row: 0, col: -1 },
            { row: 1, col: -1 },
        ];
        directions.forEach(direction => {
            var _a;
            let newRow = this.position.row + direction.row;
            let newCol = this.position.col + direction.col;
            const field = (_a = chessBoard.board[newRow]) === null || _a === void 0 ? void 0 : _a[newCol];
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if ((field === null || field === void 0 ? void 0 : field.getColor()) !== this.color)
                    moves.push({ row: newRow, col: newCol });
            }
        });
        return moves;
    }
    clone() {
        return new King(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img);
    }
}
//# sourceMappingURL=King.js.map