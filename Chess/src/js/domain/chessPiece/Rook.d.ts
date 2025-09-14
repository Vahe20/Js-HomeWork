import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
import { ChessBoard } from "../chess_board.js";
export declare class Rook extends ChessPiece {
    private isMoved;
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    getStatus(): boolean;
    changeStatus(): void;
    getAvailableMoves(chessBoard: ChessBoard): Types.position[];
    move(chessBoard: ChessBoard, pos: Types.position, newPos: Types.position): void;
    clone(): ChessPiece | undefined;
}
//# sourceMappingURL=Rook.d.ts.map