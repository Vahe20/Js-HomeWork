import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
export declare class King extends ChessPiece {
    private isMoved;
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    changeStatus(): void;
    getAvailableMoves(chessBoard: ChessBoard): Types.position[] | void;
    clone(): ChessPiece | undefined;
    move(chessBoard: ChessBoard, pos: Types.position, newPos: Types.position): void;
    castling(chessBoard: ChessBoard): Types.position | void;
}
//# sourceMappingURL=King.d.ts.map