import { Render } from './render.js';
import { ChessBoard } from './chess_board.js';
import * as func from './func.js';

import * as Types from './globalTypes';
import { ChessPiece } from './chessPiece/chessPiece.js';
import { Queen } from './chessPiece/Queen.js';

export function boardEvents(chessBoard: ChessBoard) {
    let selectedPiece: ChessPiece | undefined = undefined;

    document.querySelector('.board')?.addEventListener('click', (event) => {
        if (event.target instanceof Element) {
            const cell = event.target.closest('.board_cell');

            if (!cell) return;

            const match = [... cell.classList].find(cls => cls.startsWith('cell-'));
            if (!match) return;

            const [, row, col] = match.split('-').map(Number);

            if (typeof row !== "number" || typeof col !== "number") return;

            if (selectedPiece) {
                const cell = document.querySelector(`.cell-${row}-${col}`);
                if (cell && cell.id === "available_cell") {
                    const pos = selectedPiece.getPosition();

                    selectedPiece.move(chessBoard, { row: pos.row, col: pos.col }, { row, col });

                    if (func.isPawnPromotion(chessBoard, row, col)) {
                        const promote = document.querySelector('.promote') as HTMLDivElement;
                        promote.style.transform = 'scale(1)';

                        document.getElementById(`promote_btn`)?.addEventListener('click', (event) => {
                            console.log(event);
                        })

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

            if(chessBoard.board[row]?.[col] && chessBoard.board[row]?.[col].getColor() === chessBoard.getCurrentPlayer()) {
                Render.clearSelectedCell();
                selectedPiece = chessBoard.board[row]?.[col]
                const av_moves = selectedPiece.getAvailableMoves(chessBoard)?.filter((pos) => {
                    return func.virtualBoard(chessBoard, { row: row, col: col }, { row: pos.row, col: pos.col })
                })
                if (av_moves) { Render.renderMoves(av_moves) }
            } else {
                selectedPiece = undefined;
                Render.clearSelectedCell();
            }
        }
    });

    
    document.getElementById('restart')?.addEventListener("click", () => {
        location.reload();
    });
}
