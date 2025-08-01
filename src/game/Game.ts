
import { Board } from "./Board";
import { Piece, PieceColor, Position, PieceType } from "../pieces/Piece";
import { King } from "../pieces/King";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";
import { Bishop } from "../pieces/Bishop";
import { Knight } from "../pieces/Knight";
import { Pawn } from "../pieces/Pawn";

export class Game {
  private board: Board = new Board();
  private turn: PieceColor = PieceColor.White;
  private capturedPieces: Piece[] = [];
  private moveHistory: string[] = [];

  constructor() {
    this.setupInitialPieces();
  }

  private setupInitialPieces() {
    // Add kings
    this.board.setPieceAt({ row: 0, col: 4 }, new King(PieceColor.Black, { row: 0, col: 4 }, false));
    this.board.setPieceAt({ row: 7, col: 4 }, new King(PieceColor.White, { row: 7, col: 4 }, false));

    // Add queens
    this.board.setPieceAt({ row: 0, col: 3 }, new Queen(PieceColor.Black, { row: 0, col: 3 }, false));
    this.board.setPieceAt({ row: 7, col: 3 }, new Queen(PieceColor.White, { row: 7, col: 3 }, false));

    // Add rooks
    this.board.setPieceAt({ row: 0, col: 0 }, new Rook(PieceColor.Black, { row: 0, col: 0 }, false));
    this.board.setPieceAt({ row: 0, col: 7 }, new Rook(PieceColor.Black, { row: 0, col: 7 }, false));
    this.board.setPieceAt({ row: 7, col: 0 }, new Rook(PieceColor.White, { row: 7, col: 0 }, false));
    this.board.setPieceAt({ row: 7, col: 7 }, new Rook(PieceColor.White, { row: 7, col: 7 }, false));

    // Add bishops
    this.board.setPieceAt({ row: 0, col: 2 }, new Bishop(PieceColor.Black, { row: 0, col: 2 }, false));
    this.board.setPieceAt({ row: 0, col: 5 }, new Bishop(PieceColor.Black, { row: 0, col: 5 }, false));
    this.board.setPieceAt({ row: 7, col: 2 }, new Bishop(PieceColor.White, { row: 7, col: 2 }, false));
    this.board.setPieceAt({ row: 7, col: 5 }, new Bishop(PieceColor.White, { row: 7, col: 5 }, false));

    // Add knights
    this.board.setPieceAt({ row: 0, col: 1 }, new Knight(PieceColor.Black, { row: 0, col: 1 }, false));
    this.board.setPieceAt({ row: 0, col: 6 }, new Knight(PieceColor.Black, { row: 0, col: 6 }, false));
    this.board.setPieceAt({ row: 7, col: 1 }, new Knight(PieceColor.White, { row: 7, col: 1 }, false));
    this.board.setPieceAt({ row: 7, col: 6 }, new Knight(PieceColor.White, { row: 7, col: 6 }, false));

    // Add pawns
    for (let i = 0; i < 8; i++) {
      this.board.setPieceAt({ row: 1, col: i }, new Pawn(PieceColor.Black, { row: 1, col: i }, false));
      this.board.setPieceAt({ row: 6, col: i }, new Pawn(PieceColor.White, { row: 6, col: i }, false));
    }
  }

  getBoard(): Board {
    return this.board;
  }

  getCapturedPieces(): Piece[] {
    return this.capturedPieces;
  }

  getMoveHistory(): string[] {
    return this.moveHistory;
  }

  movePiece(from: Position, to: Position): boolean {
    const piece = this.board.getPieceAt(from);

    if (!piece || piece.color !== this.turn) {
      return false;
    }

    const availableMoves = piece.getAvailableMoves(this.board);
    if (availableMoves.some(move => move.row === to.row && move.col === to.col)) {
      const capturedPiece = this.board.getPieceAt(to);
      if (capturedPiece) {
        this.capturedPieces.push(capturedPiece);
      }

      // Handle castling
      if (piece.type === PieceType.King && Math.abs(from.col - to.col) === 2) {
        const rookCol = to.col > from.col ? 7 : 0;
        const newRookCol = to.col > from.col ? to.col - 1 : to.col + 1;
        const rook = this.board.getPieceAt({ row: from.row, col: rookCol });
        if (rook) {
          this.board.setPieceAt({ row: from.row, col: newRookCol }, rook);
          this.board.setPieceAt({ row: from.row, col: rookCol }, null);
          rook.move({ row: from.row, col: newRookCol });
        }
      }

      this.board.setPieceAt(to, piece);
      this.board.setPieceAt(from, null);
      piece.move(to);

      // Record move in history (simple notation for now)
      const fromNotation = String.fromCharCode(97 + from.col) + (8 - from.row);
      const toNotation = String.fromCharCode(97 + to.col) + (8 - to.row);
      this.moveHistory.push(`${fromNotation}${toNotation}`);

      this.turn = this.turn === PieceColor.White ? PieceColor.Black : PieceColor.White;
      return true;
    }

    return false;
  }
}
