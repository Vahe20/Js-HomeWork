import { ChessBoard } from './chess_board.js';
import * as func from './func.js';
import { boardEvents } from './event.js';


let chessBoard = new ChessBoard();
let currentPlayer = 'white';

boardEvents({
    chessBoard,
    currentPlayer
});

func.start(chessBoard);