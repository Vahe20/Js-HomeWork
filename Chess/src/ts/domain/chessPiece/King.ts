import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
import { Rook } from "./Rook.js";

export class King extends ChessPiece {
	private isMoved = false;

	constructor(
		color: Types.typePieceColor,
		type: Types.typePiece,
		position: Types.position,
		img: string
	) {
		super(color, type, position, img);
	}

	changeStatus() {
		this.isMoved = true;
	}

	getAvailableMoves(chessBoard: ChessBoard): Types.position[] | void {
		const moves: Types.position[] = [];

		const directions = [
			{ row: 1, col: 0 },
			{ row: 1, col: 1 },
			{ row: 0, col: 1 },
			{ row: -1, col: 1 },
			{ row: -1, col: 0 },
			{ row: -1, col: -1 },
			{ row: 0, col: -1 },
			{ row: 1, col: -1 },
		];

		directions.forEach(direction => {
			let newRow = this.position.row + direction.row;
			let newCol = this.position.col + direction.col;

			const field = chessBoard.getPiece(newRow, newCol);

			if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
				if (field?.getColor() !== this.color)
					moves.push({ row: newRow, col: newCol });
			}
		});

		let Castling = this.castling(chessBoard);
		if (Castling) {
			moves.push(Castling);
		}

		return moves;
	}

	clone(): ChessPiece | undefined {
		return new King(
			this.color,
			this.type,
			{ row: this.position.row, col: this.position.col },
			this.img
		);
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

	castling(chessBoard: ChessBoard): Types.position | void {
		if (this.isMoved === true) {
			return;
		}

		const color = this.color;
		const row = color === "white" ? 0 : 7;
		const col = this.position.col;

		const rookShort = chessBoard.getPiece(row, 7);
	}
}
