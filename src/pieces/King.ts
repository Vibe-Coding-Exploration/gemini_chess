
import { Piece, PieceColor, PieceType, Position } from "./Piece";
import { Board } from "../game/Board";
import { Rook } from "./Rook";

export class King extends Piece {
  constructor(color: PieceColor, position: Position, hasMoved: boolean = false) {
    super(PieceType.King, color, position, hasMoved);
  }

  getAvailableMoves(board: Board): Position[] {
    const moves: Position[] = [];
    const { row, col } = this.position;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newPosition = { row: row + i, col: col + j };

        if (board.isValidPosition(newPosition)) {
          const pieceAtNewPosition = board.getPieceAt(newPosition);
          if (!pieceAtNewPosition || pieceAtNewPosition.color !== this.color) {
            moves.push(newPosition);
          }
        }
      }
    }

    // Castling
    if (!this.hasMoved) {
      // Kingside Castling
      const kingsideRookPosition = { row, col: 7 };
      const kingsideRook = board.getPieceAt(kingsideRookPosition);

      if (kingsideRook instanceof Rook && !kingsideRook.hasMoved && kingsideRook.color === this.color) {
        if (!board.getPieceAt({ row, col: 5 }) && !board.getPieceAt({ row, col: 6 })) {
          moves.push({ row, col: col + 2 });
        }
      }

      // Queenside Castling
      const queensideRookPosition = { row, col: 0 };
      const queensideRook = board.getPieceAt(queensideRookPosition);

      if (queensideRook instanceof Rook && !queensideRook.hasMoved && queensideRook.color === this.color) {
        if (!board.getPieceAt({ row, col: 1 }) && !board.getPieceAt({ row, col: 2 }) && !board.getPieceAt({ row, col: 3 })) {
          moves.push({ row, col: col - 2 });
        }
      }
    }

    return moves;
  }
}
