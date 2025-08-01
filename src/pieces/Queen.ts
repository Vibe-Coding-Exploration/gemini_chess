
import { Board } from "../game/Board";
import { Piece, PieceColor, PieceType, Position } from "./Piece";

export class Queen extends Piece {
  constructor(color: PieceColor, position: Position, hasMoved: boolean = false) {
    super(PieceType.Queen, color, position, hasMoved);
  }

  getAvailableMoves(board: Board): Position[] {
    const moves: Position[] = [];
    const { row, col } = this.position;

    const directions = [
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    for (const direction of directions) {
      let currentPosition = { row: row + direction.row, col: col + direction.col };

      while (board.isValidPosition(currentPosition)) {
        const piece = board.getPieceAt(currentPosition);

        if (piece) {
          if (piece.color !== this.color) {
            moves.push(currentPosition);
          }
          break;
        }

        moves.push(currentPosition);
        currentPosition = { row: currentPosition.row + direction.row, col: currentPosition.col + direction.col };
      }
    }

    return moves;
  }
}
