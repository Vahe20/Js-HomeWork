import { Render } from "./render.js";
import { ChessBoard } from "./chess_board.js";
import * as func from "./func.js";

import { ChessPiece } from "./chessPiece/chessPiece.js";

export function boardEvents(chessBoard: ChessBoard) {
	let selectedPiece: ChessPiece | undefined = undefined;

	document.querySelector(".board")?.addEventListener("click", event => {
		if (event.target instanceof Element) {
			const cell = event.target.closest(".board_cell");

			if (!cell) return;

			const match = [...cell.classList].find(cls =>
				cls.startsWith("cell-")
			);
			if (!match) return;

			const [, row, col] = match.split("-").map(Number);

			if (typeof row !== "number" || typeof col !== "number") return;

			if (selectedPiece) {
				const cell = document.querySelector(`.cell-${row}-${col}`);
				if (cell && cell.id === "available_cell") {
					const pos = selectedPiece.getPosition();

					selectedPiece.move(
						chessBoard,
						{ row: pos.row, col: pos.col },
						{ row, col }
					);

					if (func.isPawnPromotion(chessBoard, row, col)) {
						func.selectPiecePromotion(chessBoard, row, col);
					}

					chessBoard.changeCurrentPlayer();

					if (func.isMath(chessBoard)) {
						Render.renderMath(chessBoard);
					}

					Render.renderBoard(chessBoard);
				}
			}

			if (
				chessBoard.getPiece(row, col) &&
				chessBoard.getPiece(row, col)?.getColor() ===
					chessBoard.getCurrentPlayer()
			) {
				Render.clearSelectedCell();
				selectedPiece = chessBoard.getPiece(row, col);
				const av_moves = selectedPiece
					?.getAvailableMoves(chessBoard)
					?.filter(pos => {
						return func.virtualBoard(
							chessBoard,
							{ row: row, col: col },
							{ row: pos.row, col: pos.col }
						);
					});

				if (av_moves) {
					Render.renderMoves(av_moves);
				}
			} else {
				selectedPiece = undefined;
				Render.clearSelectedCell();
			}
		}
	});

	document.getElementById("restart")?.addEventListener("click", () => {
		func.start(chessBoard);
		const tmp = document.querySelector(".menu") as HTMLDivElement;
		chessBoard.changeCurrentPlayer();
		tmp.style.transform = "scale(0)";
		Render.renderBoard(chessBoard);
	});
}
