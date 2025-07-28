export class ChessBoard {
    constructor() {
        this.board = Array.from({ length: 9 }, () => Array(9));
        this.currentPlayer = 'white';
        this.selectedPiece = null;
    }
}
