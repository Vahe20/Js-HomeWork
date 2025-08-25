import { ChessBoard } from "./chess_board.js";
import { Render } from "./render.js";
import * as func from "./func.js";
import { boardEvents } from "./event.js";

func.generateHtmlCells();

let chessBoard = new ChessBoard();

boardEvents(chessBoard);

func.start(chessBoard);