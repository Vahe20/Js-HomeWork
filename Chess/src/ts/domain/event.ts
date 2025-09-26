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

				if (cell && cell.id === "castling_cell") {
					const pos = selectedPiece.getPosition();

					selectedPiece.move(
						chessBoard,
						{ row: pos.row, col: pos.col },
						{ row, col }
					);

					const rook = chessBoard.getPiece(row, col === 6 ? 7 : 0);
					if (rook) {
						rook.move(
							chessBoard,
							{ row: row, col: col === 6 ? 7 : 0 },
							{ row: row, col: col === 6 ? 5 : 3 }
						);
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

				const castling_pos = (selectedPiece as any).castling?.(
					chessBoard
				);

				if (castling_pos) {
					Render.renderCastlingMove(castling_pos);
				}

				if (av_moves) {
					Render.renderMoves(av_moves);
				}
			} else {
				selectedPiece = undefined;
				Render.clearSelectedCell();
			}
		}
	});


	document.getElementById("menu_open")?.addEventListener('click', () => {
		const menu = document.querySelector(".menu") as HTMLDivElement;
		menu.style.transform = "scale(1)";
	})


	document.getElementById("menu_exit")?.addEventListener('click', () => {
		const menu = document.querySelector(".menu") as HTMLDivElement;
		menu.style.transform = "scale(0)";
	});

	document.getElementById("restart")?.addEventListener("click", () => {
		func.start(chessBoard);
		const menu = document.querySelector(".menu") as HTMLDivElement;
		menu.style.transform = "scale(0)";
		Render.renderBoard(chessBoard);
	});

	document.getElementById("rotate")?.addEventListener("click", () => {
		const blackPieces = document.getElementsByClassName("black");

		for (let i = 0; i < blackPieces.length; i++) {
			const el = blackPieces[i] as HTMLElement;
			el.style.transform =
				el.style.transform === "rotate(180deg)"
					? "rotate(0deg)"
					: "rotate(180deg)";
		}
	});

	document.getElementById("changeColor")?.addEventListener("click", () => {
		const board = document.querySelector(".board") as HTMLElement | null;
		if (!board) return;

		let current = Number(board.dataset.colorVariant ?? "0");
		current = (current + 1) % 3;
		board.dataset.colorVariant = String(current);

		board.classList.remove("theme-0", "theme-1", "theme-2");
		board.classList.add(`theme-${current}`);
	});

}
