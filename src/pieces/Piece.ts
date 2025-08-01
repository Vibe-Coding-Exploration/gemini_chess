import { Board } from "../game/Board";

export type Position = {
  row: number;
  col: number;
};

export enum PieceColor {
  White,
  Black,
}

export enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
}

export abstract class Piece {
  protected constructor(
    public readonly type: PieceType,
    public readonly color: PieceColor,
    public position: Position,
    protected _hasMoved: boolean = false
  ) {}

  abstract getAvailableMoves(board: Board): Position[];

  move(position: Position) {
    this.position = position;
    this._hasMoved = true;
  }

  get hasMoved(): boolean {
    return this._hasMoved;
  }
}