import { Render } from "./render.js";
import { History } from "./history.js";
import * as func from "./func.js";
export function boardEvents(chessBoard) {
    var _a, _b, _c, _d, _e, _f;
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
                    History.addMove({ row: pos.row, col: pos.col }, { row, col });
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
    (_b = document.getElementById("menu_open")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        const menu = document.querySelector(".menu");
        menu.style.transform = "scale(1)";
    });
    (_c = document.getElementById("menu_exit")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        const menu = document.querySelector(".menu");
        menu.style.transform = "scale(0)";
    });
    (_d = document.getElementById("restart")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        func.start(chessBoard);
        const menu = document.querySelector(".menu");
        menu.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_e = document.getElementById("rotate")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        const blackPieces = document.getElementsByClassName("black");
        for (let i = 0; i < blackPieces.length; i++) {
            const el = blackPieces[i];
            el.style.transform =
                el.style.transform === "rotate(180deg)"
                    ? "rotate(0deg)"
                    : "rotate(180deg)";
        }
    });
    (_f = document.getElementById("changeColor")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
        var _a;
        const board = document.querySelector(".board");
        if (!board)
            return;
        let current = Number((_a = board.dataset.colorVariant) !== null && _a !== void 0 ? _a : "0");
        current = (current + 1) % 3;
        board.dataset.colorVariant = String(current);
        board.classList.remove("theme-0", "theme-1", "theme-2");
        board.classList.add(`theme-${current}`);
    });
}
//# sourceMappingURL=event.js.map