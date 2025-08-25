export class ChessBoard {
    constructor(color = "white") {
        this.board = Array.from({ length: 8 }, () => new Array(8).fill(undefined));
        this.currentPlayer = color;
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    changeCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    }
}
//# sourceMappingURL=chess_board.js.map