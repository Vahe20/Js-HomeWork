import { Render } from './render.js';
import * as func from './func.js';



export function boardEvents({ chessBoard, currentPlayer}) {
    let selectedPiece = null;
    let selectedPiecePos = null;

    document.querySelector('.board').addEventListener('click', (event) => {
        const cell = event.target.closest('.board_cell');
        if (!cell) return;
    
        const match = [...cell.classList].find(cls => cls.startsWith('cell-'));
        if (!match) return;
    
        const [, row, col] = match.split('-').map(Number);

        // if (func.getKing(chessBoard, currentPlayer).check === true) {
        //     return;
        // }
    
        if (document.querySelector(`.${match}`).id === "available_cell" || document.querySelector(`.${match}`).id === "attack_cell") {
            Render.clearSelectedCell();
    
            chessBoard.board[selectedPiecePos[0]][selectedPiecePos[1]] = undefined;
            selectedPiece.position = [row, col];
            chessBoard.board[row][col] = selectedPiece;
    
            Render.renderBoard(chessBoard);
    
            selectedPiece = null;
            selectedPiecePos = null;
    
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';

            func.isCheck(chessBoard, currentPlayer)

            return;
        }
    
        if (chessBoard.board[row][col] === undefined) {
            Render.clearSelectedCell();
    
            selectedPiece = null;
            selectedPiecePos = null;
    
            return;
        }
    
        Render.clearSelectedCell();
    
        if (chessBoard.board[row][col].color !== currentPlayer) {
            return;
        }
    
        selectedPiece = chessBoard.board[row][col];
        selectedPiecePos = [row, col];
        
        Render.availableMoves(chessBoard, row, col);
        Render.availableAttack(chessBoard, row, col);
    });
}

