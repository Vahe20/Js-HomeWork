import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
import { ChessBoard } from "../chess_board.js";

export class Rook extends ChessPiece {
	private isMoved = false;

	constructor(
		color: Types.typePieceColor,
		type: Types.typePiece,
		position: Types.position,
		img: string
	) {
		super(color, type, position, img);
	}

    getStatus(): boolean {
        return this.isMoved;
    }

	changeStatus() {
		this.isMoved = true;
	}

	getAvailableMoves(chessBoard: ChessBoard) {
		const moves: Types.position[] = [];

		const directions = [
			{ row: 1, col: 0 },
			{ row: -1, col: 0 },
			{ row: 0, col: 1 },
			{ row: 0, col: -1 },
		];

		for (const direction of directions) {
			let newRow = this.position.row + direction.row;
			let newCol = this.position.col + direction.col;

			while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
				const field = chessBoard.getPiece(newRow, newCol);

				if (field) {
					if (field.getColor() !== this.color)
						moves.push({ row: newRow, col: newCol });
					break;
				}

				moves.push({ row: newRow, col: newCol });

				newRow += direction.row;
				newCol += direction.col;
			}
		}

		return moves;
	}

	move(
		chessBoard: ChessBoard,
		pos: Types.position,
		newPos: Types.position
	): void {
		this.changeStatus();
		chessBoard.deletePiece(pos.row, pos.col);
		chessBoard.setPiece(newPos.row, newPos.col, this);
		this.setPosition({ row: newPos.row, col: newPos.col });
	}

	clone(): ChessPiece | undefined {
		return new Rook(
			this.color,
			this.type,
			{ row: this.position.row, col: this.position.col },
			this.img
		);
	}
}
