import { ChessBoard } from "./chess_board.js";
import { Pawn } from "./chessPiece/Pawn.js";
import { Rook } from "./chessPiece/Rook.js";
import { Knight } from "./chessPiece/Knight.js";
import { Bishop } from "./chessPiece/Bishop.js";
import { Queen } from "./chessPiece/Queen.js";
import { King } from "./chessPiece/King.js";
import { Render } from "./render.js";
export function start(chessBoard) {
    if (!chessBoard || !chessBoard.board)
        return;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessBoard.board[i][j] = undefined;
        }
    }
    const setupRow = (row, color, imgPrefix) => {
        chessBoard.board[row][0] = new Rook(color, 'rook', { row: row, col: 0 }, `images/${imgPrefix}_rook.png`);
        chessBoard.board[row][1] = new Knight(color, 'knight', { row: row, col: 1 }, `images/${imgPrefix}_knight.png`);
        chessBoard.board[row][2] = new Bishop(color, 'bishop', { row: row, col: 2 }, `images/${imgPrefix}_bishop.png`);
        chessBoard.board[row][3] = new Queen(color, 'queen', { row: row, col: 3 }, `images/${imgPrefix}_queen.png`);
        chessBoard.board[row][4] = new King(color, 'king', { row: row, col: 4 }, `images/${imgPrefix}_king.png`);
        chessBoard.board[row][5] = new Bishop(color, 'bishop', { row: row, col: 5 }, `images/${imgPrefix}_bishop.png`);
        chessBoard.board[row][6] = new Knight(color, 'knight', { row: row, col: 6 }, `images/${imgPrefix}_knight.png`);
        chessBoard.board[row][7] = new Rook(color, 'rook', { row: row, col: 7 }, `images/${imgPrefix}_rook.png`);
    };
    setupRow(0, 'white', 'white');
    setupRow(7, 'black', 'black');
    for (let i = 0; i < 8; i++) {
        chessBoard.board[1][i] = new Pawn('white', 'pawn', { row: 1, col: i }, 'images/white_pawn.png');
        chessBoard.board[6][i] = new Pawn('black', 'pawn', { row: 6, col: i }, 'images/black_pawn.png');
    }
    Render.renderBoard(chessBoard);
}
export function generateHtmlCells() {
    var _a;
    for (let i = 7; i >= 0; --i) {
        for (let j = 0; j < 8; ++j) {
            const cell = document.createElement('div');
            cell.classList.add('board_cell');
            cell.classList.add(`cell-${i}-${j}`);
            (_a = document.querySelector('.board')) === null || _a === void 0 ? void 0 : _a.appendChild(cell);
            if ((i + j) % 2 === 0) {
                cell.classList.add('black_cell');
            }
        }
    }
}
export function isPawnPromotion(chessBoard, row, col) {
    var _a;
    const piece = (_a = chessBoard.board[row]) === null || _a === void 0 ? void 0 : _a[col];
    return piece && piece.getType() === 'pawn' && (row === 0 || row === 7);
}
export function selectPiecePromotion() {
}
export function getKing(chessBoard, color) {
    var _a;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = (_a = chessBoard.board[i]) === null || _a === void 0 ? void 0 : _a[j];
            if (piece && piece.getType() === 'king' && piece.getColor() === color)
                return piece;
        }
    }
}
export function isCheck(chessBoard) {
    var _a;
    const currentPlayer = chessBoard.getCurrentPlayer();
    const king = getKing(chessBoard, currentPlayer);
    const kingPos = king === null || king === void 0 ? void 0 : king.getPosition();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = (_a = chessBoard.board[i]) === null || _a === void 0 ? void 0 : _a[j];
            if (piece && piece.getColor() !== currentPlayer) {
                const moves_pos = piece.getAvailableMoves(chessBoard);
                if (kingPos && (moves_pos === null || moves_pos === void 0 ? void 0 : moves_pos.some((pos) => {
                    return pos.row === (kingPos === null || kingPos === void 0 ? void 0 : kingPos.row) && pos.col === (kingPos === null || kingPos === void 0 ? void 0 : kingPos.col);
                }))) {
                    Render.renderCheck(chessBoard, kingPos.row, kingPos.col);
                    return true;
                }
            }
        }
    }
    const tmp = document.querySelector(`.cell-${kingPos === null || kingPos === void 0 ? void 0 : kingPos.row}-${kingPos === null || kingPos === void 0 ? void 0 : kingPos.col}`);
    if (tmp)
        tmp.id = "";
    return false;
}
export function isMath(chessBoard) {
    var _a;
    const color = chessBoard.getCurrentPlayer();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = (_a = chessBoard.board[i]) === null || _a === void 0 ? void 0 : _a[j];
            if (piece && piece.getColor() === color) {
                const moves = piece.getAvailableMoves(chessBoard);
                if (moves === null || moves === void 0 ? void 0 : moves.some(pos => virtualBoard(chessBoard, { row: i, col: j }, pos))) {
                    return false;
                }
            }
        }
    }
    return true;
}
export function virtualBoard(chessBoard, pos, newPos) {
    var _a, _b, _c, _d, _e, _f, _g;
    const virtualBoard = new ChessBoard(chessBoard.getCurrentPlayer());
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            virtualBoard.board[i][j] = (_b = (_a = chessBoard.board[i]) === null || _a === void 0 ? void 0 : _a[j]) === null || _b === void 0 ? void 0 : _b.clone();
            if ((_c = virtualBoard.board[i]) === null || _c === void 0 ? void 0 : _c[j]) {
                (_d = virtualBoard.board[i][j]) === null || _d === void 0 ? void 0 : _d.setPosition({ row: i, col: j });
            }
        }
    }
    virtualBoard.board[newPos.row][newPos.col] = (_e = virtualBoard.board[pos.row]) === null || _e === void 0 ? void 0 : _e[pos.col];
    (_g = (_f = virtualBoard.board[newPos.row]) === null || _f === void 0 ? void 0 : _f[newPos.col]) === null || _g === void 0 ? void 0 : _g.setPosition({ row: newPos.row, col: newPos.col });
    virtualBoard.board[pos.row][pos.col] = undefined;
    return !isCheck(virtualBoard);
}
//# sourceMappingURL=func.js.map