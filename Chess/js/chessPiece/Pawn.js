import { ChessPiece } from "./chessPiece.js";
export class Pawn extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
    }
    getAvailableMoves(chessBoard) {
        var _a, _b, _c, _d, _e, _f;
        const moves = [];
        const direction = this.color === "white" ? 1 : -1;
        const row = this.position.row;
        const col = this.position.col;
        if (((_a = chessBoard.board[row + direction]) === null || _a === void 0 ? void 0 : _a[col]) === undefined) {
            moves.push({ row: row + direction, col: col });
            const pos = this.color === "white" ? 1 : 6;
            if (row === pos && ((_b = chessBoard.board[row + direction + direction]) === null || _b === void 0 ? void 0 : _b[col]) === undefined) {
                moves.push({ row: row + direction + direction, col: col });
            }
        }
        if (col + 1 < 8 && ((_c = chessBoard.board[row + direction]) === null || _c === void 0 ? void 0 : _c[col + 1]) !== undefined) {
            const tmp = (_d = chessBoard.board[row + direction]) === null || _d === void 0 ? void 0 : _d[col + 1];
            if (tmp && tmp.getColor() !== this.color) {
                moves.push({ row: row + direction, col: col + 1 });
            }
        }
        if (col - 1 >= 0 && ((_e = chessBoard.board[row + direction]) === null || _e === void 0 ? void 0 : _e[col - 1]) !== undefined) {
            const tmp = (_f = chessBoard.board[row + direction]) === null || _f === void 0 ? void 0 : _f[col - 1];
            if (tmp && tmp.getColor() !== this.color) {
                moves.push({ row: row + direction, col: col - 1 });
            }
        }
        return moves;
    }
    clone() {
        return new Pawn(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img);
    }
}
//# sourceMappingURL=Pawn.js.map