
import { Game } from "./game/Game";
import { Position } from "./pieces/Piece";

export const movePieceApi = (game: Game, from: Position, to: Position): Promise<Game> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = game.movePiece(from, to);
      if (success) {
        const newGame = new Game();
        (newGame as any).board = game.getBoard();
        (newGame as any).turn = (game as any).turn;
        (newGame as any).capturedPieces = game.getCapturedPieces();
        (newGame as any).moveHistory = game.getMoveHistory();
        resolve(newGame);
      } else {
        reject(new Error("Invalid move"));
      }
    }, 500); // Simulate network delay
  });
};
