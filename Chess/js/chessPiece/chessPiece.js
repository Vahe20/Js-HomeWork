export class ChessPiece {
    constructor(color, type, position, img) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.img = img;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getPosition() {
        return this.position;
    }
    setPosition(position) {
        this.position = position;
    }
    getImg() {
        return this.img;
    }
    setImg(img) {
        this.img = img;
    }
    move(chessBoard, pos, newPos) {
        chessBoard.board[pos.row][pos.col] = undefined;
        chessBoard.board[newPos.row][newPos.col] = this;
        this.setPosition({ row: newPos.row, col: newPos.col });
    }
}
//# sourceMappingURL=chessPiece.js.map