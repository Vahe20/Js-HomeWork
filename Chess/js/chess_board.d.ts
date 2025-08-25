import { ChessPiece } from "./chessPiece/chessPiece.js";
import * as Types from "./globalTypes.js";
export declare class ChessBoard {
    board: (ChessPiece | undefined)[][];
    private currentPlayer;
    constructor(color?: Types.typePlaceColor);
    getCurrentPlayer(): Types.typePlaceColor;
    changeCurrentPlayer(): void;
}
//# sourceMappingURL=chess_board.d.ts.map