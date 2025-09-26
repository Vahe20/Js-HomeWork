import { ChessPiece } from "./chessPiece/chessPiece.js";
import * as Types from "./globalTypes.js";
export declare class ChessBoard {
    private board;
    private currentPlayer;
    constructor(color?: Types.typePieceColor);
    getCurrentPlayer(): Types.typePieceColor;
    changeCurrentPlayer(): void;
    setCurrentPlayer(color: Types.typePieceColor): void;
    getPiece(i: number, j: number): ChessPiece | undefined;
    setPiece(i: number, j: number, Piece: ChessPiece): void;
    deletePiece(i: number, j: number): void;
}
//# sourceMappingURL=chess_board.d.ts.map