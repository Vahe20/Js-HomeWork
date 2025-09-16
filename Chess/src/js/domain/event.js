import { Render } from "./render.js";
import * as func from "./func.js";
export function boardEvents(chessBoard) {
    var _a, _b;
    let selectedPiece = undefined;
    (_a = document.querySelector(".board")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", event => {
        var _a, _b, _c, _d;
        if (event.target instanceof Element) {
            const cell = event.target.closest(".board_cell");
            if (!cell)
                return;
            const match = [...cell.classList].find(cls => cls.startsWith("cell-"));
            if (!match)
                return;
            const [, row, col] = match.split("-").map(Number);
            if (typeof row !== "number" || typeof col !== "number")
                return;
            if (selectedPiece) {
                const cell = document.querySelector(`.cell-${row}-${col}`);
                if (cell && cell.id === "available_cell") {
                    const pos = selectedPiece.getPosition();
                    selectedPiece.move(chessBoard, { row: pos.row, col: pos.col }, { row, col });
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
                    selectedPiece.move(chessBoard, { row: pos.row, col: pos.col }, { row, col });
                    const rook = chessBoard.getPiece(row, col === 6 ? 7 : 0);
                    if (rook) {
                        rook.move(chessBoard, { row: row, col: col === 6 ? 7 : 0 }, { row: row, col: col === 6 ? 5 : 3 });
                    }
                    chessBoard.changeCurrentPlayer();
                    if (func.isMath(chessBoard)) {
                        Render.renderMath(chessBoard);
                    }
                    Render.renderBoard(chessBoard);
                }
            }
            if (chessBoard.getPiece(row, col) &&
                ((_a = chessBoard.getPiece(row, col)) === null || _a === void 0 ? void 0 : _a.getColor()) ===
                    chessBoard.getCurrentPlayer()) {
                Render.clearSelectedCell();
                selectedPiece = chessBoard.getPiece(row, col);
                const av_moves = (_b = selectedPiece === null || selectedPiece === void 0 ? void 0 : selectedPiece.getAvailableMoves(chessBoard)) === null || _b === void 0 ? void 0 : _b.filter(pos => {
                    return func.virtualBoard(chessBoard, { row: row, col: col }, { row: pos.row, col: pos.col });
                });
                const castling_pos = (_d = (_c = selectedPiece).castling) === null || _d === void 0 ? void 0 : _d.call(_c, chessBoard);
                if (castling_pos) {
                    Render.renderCastlingMove(castling_pos);
                }
                if (av_moves) {
                    Render.renderMoves(av_moves);
                }
            }
            else {
                selectedPiece = undefined;
                Render.clearSelectedCell();
            }
        }
    });
    (_b = document.getElementById("restart")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        func.start(chessBoard);
        const tmp = document.querySelector(".menu");
        chessBoard.changeCurrentPlayer();
        tmp.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
}
//# sourceMappingURL=event.js.map