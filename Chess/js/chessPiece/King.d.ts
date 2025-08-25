import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
export declare class King extends ChessPiece {
    constructor(color: Types.typePlaceColor, type: Types.typePiece, position: Types.position, img: string);
    getAvailableMoves(chessBoard: ChessBoard): Types.position[];
    clone(): ChessPiece | undefined;
}
//# sourceMappingURL=King.d.ts.map