
import { Board } from "../game/Board";
import { Piece, PieceColor, PieceType, Position } from "./Piece";

export class Knight extends Piece {
  constructor(color: PieceColor, position: Position, hasMoved: boolean = false) {
    super(PieceType.Knight, color, position, hasMoved);
  }

  getAvailableMoves(board: Board): Position[] {
    const moves: Position[] = [];
    const { row, col } = this.position;

    const knightMoves = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    for (const move of knightMoves) {
      const newPosition = { row: row + move.row, col: col + move.col };

      if (board.isValidPosition(newPosition)) {
        const piece = board.getPieceAt(newPosition);
        if (!piece || piece.color !== this.color) {
          moves.push(newPosition);
        }
      }
    }

    return moves;
  }
}
