import { ChessBoard } from './chess_board.js';
import { boardEvents } from './event.js';
import * as func from './func.js';


func.generateHtmlCells();

let chessBoard = new ChessBoard();
let currentPlayer = 'white';

boardEvents(chessBoard, currentPlayer);

func.start(chessBoard);