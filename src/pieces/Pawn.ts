
import { Board } from "../game/Board";
import { Piece, PieceColor, PieceType, Position } from "./Piece";

export class Pawn extends Piece {
  constructor(color: PieceColor, position: Position, hasMoved: boolean = false) {
    super(PieceType.Pawn, color, position, hasMoved);
  }

  getAvailableMoves(board: Board): Position[] {
    const moves: Position[] = [];
    const { row, col } = this.position;
    const direction = this.color === PieceColor.White ? -1 : 1;

    // 1. Move one step forward
    const oneStepForward: Position = { row: row + direction, col };
    if (board.isValidPosition(oneStepForward) && !board.getPieceAt(oneStepForward)) {
      moves.push(oneStepForward);

      // 2. Move two steps forward from initial position
      if (!this.hasMoved) {
        const twoStepsForward: Position = { row: row + 2 * direction, col };
        if (board.isValidPosition(twoStepsForward) && !board.getPieceAt(twoStepsForward)) {
          moves.push(twoStepsForward);
        }
      }
    }

    // 3. Capture diagonally
    const diagonalMoves: Position[] = [
      { row: row + direction, col: col - 1 },
      { row: row + direction, col: col + 1 },
    ];

    for (const move of diagonalMoves) {
      if (board.isValidPosition(move)) {
        const piece = board.getPieceAt(move);
        if (piece && piece.color !== this.color) {
          moves.push(move);
        }
      }
    }

    return moves;
  }
}
