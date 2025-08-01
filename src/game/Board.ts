
import { Piece, Position } from "../pieces/Piece";

export class Board {
  private board: (Piece | null)[][] = [];

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    for (let i = 0; i < 8; i++) {
      this.board.push(new Array(8).fill(null));
    }
  }

  getPieceAt(position: Position): Piece | null {
    return this.board[position.row][position.col];
  }

  isValidPosition(position: Position): boolean {
    return (
      position.row >= 0 &&
      position.row < 8 &&
      position.col >= 0 &&
      position.col < 8
    );
  }

  setPieceAt(position: Position, piece: Piece | null) {
    this.board[position.row][position.col] = piece;
  }
}
