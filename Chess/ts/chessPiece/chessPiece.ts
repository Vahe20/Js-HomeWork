import { ChessBoard } from "../chess_board";
import * as Types from "../globalTypes";

export abstract class ChessPiece {
    protected color: Types.typePlaceColor;
    protected type: Types.typePiece;
    protected position: Types.position;
    protected img: string;

    constructor(color: Types.typePlaceColor, type: Types.typePiece, position: Types.position, img: string) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.img = img;
    }

    getColor(): Types.typePlaceColor {
        return this.color;
    }

    setColor(color: Types.typePlaceColor): void {
        this.color = color;
    }

    getType(): Types.typePiece {
        return this.type;
    }

    setType(type: Types.typePiece): void {
        this.type = type;
    }

    getPosition(): Types.position {
        return this.position;
    }

    setPosition(position: Types.position): void {
        this.position = position;
    }

    getImg(): string {
        return this.img;
    }

    setImg(img: string): void {
        this.img = img;
    }

    abstract clone(): ChessPiece | undefined;

    abstract getAvailableMoves(chessBoard: ChessBoard): Types.position[] | void

    move(chessBoard: ChessBoard, pos: Types.position, newPos: Types.position) {
        chessBoard.board[pos.row]![pos.col] = undefined;
        chessBoard.board[newPos.row]![newPos.col] = this;
        this.setPosition({ row: newPos.row, col: newPos.col });
    }
}