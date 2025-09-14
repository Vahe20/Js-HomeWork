import { ChessPiece } from "./chessPiece.js";
export class King extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
        this.isMoved = false;
    }
    changeStatus() {
        this.isMoved = true;
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
            let newRow = this.position.row + direction.row;
            let newCol = this.position.col + direction.col;
            const field = chessBoard.getPiece(newRow, newCol);
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if ((field === null || field === void 0 ? void 0 : field.getColor()) !== this.color)
                    moves.push({ row: newRow, col: newCol });
            }
        });
        let Castling = this.castling(chessBoard);
        if (Castling) {
            moves.push(Castling);
        }
        return moves;
    }
    clone() {
        return new King(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img);
    }
    move(chessBoard, pos, newPos) {
        this.changeStatus();
        chessBoard.deletePiece(pos.row, pos.col);
        chessBoard.setPiece(newPos.row, newPos.col, this);
        this.setPosition({ row: newPos.row, col: newPos.col });
    }
    castling(chessBoard) {
        if (this.isMoved === true) {
            return;
        }
        const color = this.color;
        const row = color === "white" ? 0 : 7;
        const col = this.position.col;
        const rookShort = chessBoard.getPiece(row, 7);
    }
}
//# sourceMappingURL=King.js.map