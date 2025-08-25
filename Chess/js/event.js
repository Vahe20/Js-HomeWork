import { Render } from './render.js';
import * as func from './func.js';
export function boardEvents(chessBoard) {
    var _a, _b;
    let selectedPiece = undefined;
    (_a = document.querySelector('.board')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
        var _a, _b, _c, _d, _e;
        if (event.target instanceof Element) {
            const cell = event.target.closest('.board_cell');
            if (!cell)
                return;
            const match = [...cell.classList].find(cls => cls.startsWith('cell-'));
            if (!match)
                return;
            const [, row, col] = match.split('-').map(Number);
            if (typeof row !== "number" || typeof col !== "number")
                return;
            if (selectedPiece) {
                const cell = document.querySelector(`.cell-${row}-${col}`);
                if (cell && cell.id === "available_cell") {
                    const pos = selectedPiece.getPosition();
                    selectedPiece.move(chessBoard, { row: pos.row, col: pos.col }, { row, col });
                    if (func.isPawnPromotion(chessBoard, row, col)) {
                        const promote = document.querySelector('.promote');
                        promote.style.transform = 'scale(1)';
                        (_a = document.getElementById(`promote_btn`)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
                            console.log(event);
                        });
                        const piece = func.selectPiecePromotion();
                        // switch (piece) {
                        //     case 'queen':
                        //         chessBoard.board[row]![col] = new Queen(chessBoard.getCurrentPlayer(), 'queen', { row, col }, `images/${chessBoard.getCurrentPlayer()}_queen.png`);
                        //         break;
                        //     case 'rook':
                        //         chessBoard.board[row]![col] = new Queen(chessBoard.getCurrentPlayer(), 'rook', { row, col }, `images/${chessBoard.getCurrentPlayer()}_rook.png`);
                        //         break;
                        //     case 'bishop':
                        //         chessBoard.board[row]![col] = new Queen(chessBoard.getCurrentPlayer(), 'bishop', { row, col }, `images/${chessBoard.getCurrentPlayer()}_bishop.png`);
                        //         break;
                        //     case 'knight':
                        //         chessBoard.board[row]![col] = new Queen(chessBoard.getCurrentPlayer(), 'knight', { row, col }, `images/${chessBoard.getCurrentPlayer()}_knight.png`);
                        //         break;
                        //     default:
                        //         chessBoard.board[row]![col] = new Queen(chessBoard.getCurrentPlayer(), 'queen', { row, col }, `images/${chessBoard.getCurrentPlayer()}_queen.png`);
                        // }
                    }
                    chessBoard.changeCurrentPlayer();
                    if (func.isMath(chessBoard)) {
                        Render.renderMath(chessBoard);
                    }
                    Render.renderBoard(chessBoard);
                }
            }
            if (((_b = chessBoard.board[row]) === null || _b === void 0 ? void 0 : _b[col]) && ((_c = chessBoard.board[row]) === null || _c === void 0 ? void 0 : _c[col].getColor()) === chessBoard.getCurrentPlayer()) {
                Render.clearSelectedCell();
                selectedPiece = (_d = chessBoard.board[row]) === null || _d === void 0 ? void 0 : _d[col];
                const av_moves = (_e = selectedPiece.getAvailableMoves(chessBoard)) === null || _e === void 0 ? void 0 : _e.filter((pos) => {
                    return func.virtualBoard(chessBoard, { row: row, col: col }, { row: pos.row, col: pos.col });
                });
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
    (_b = document.getElementById('restart')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        location.reload();
    });
}
//# sourceMappingURL=event.js.map