import { ChessPiece } from "./chessPiece/chessPiece.js";
import * as Types from "./globalTypes.js";

export class ChessBoard {
    public board: (ChessPiece | undefined)[][];
    private currentPlayer: Types.typePlaceColor;

    constructor(color: Types.typePlaceColor = "white") {
        this.board = Array.from({ length: 8 }, () => new Array(8).fill(undefined) as (ChessPiece | undefined)[]);
        this.currentPlayer = color;
    }

    getCurrentPlayer(): Types.typePlaceColor {
        return this.currentPlayer;
    }

    changeCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    }
}

