
import React, { useState } from 'react';
import { Game } from '../game/Game';
import { Piece, PieceColor, Position } from '../pieces/Piece';
import Square from './Square';
import { movePieceApi } from '../api';

const Board: React.FC = () => {
  const [game, setGame] = useState(new Game());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [availableMoves, setAvailableMoves] = useState<Position[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSquareClick = async (position: Position) => {
    setError(null);
    if (selectedPosition) {
      try {
        const newGame = await movePieceApi(game, selectedPosition, position);
        setGame(newGame);
        setSelectedPosition(null);
        setAvailableMoves([]);
      } catch (error) {
        setError("Invalid move");
        const piece = game.getBoard().getPieceAt(position);
        if (piece) {
          setSelectedPosition(position);
          setAvailableMoves(piece.getAvailableMoves(game.getBoard()));
        } else {
          setSelectedPosition(null);
          setAvailableMoves([]);
        }
      }
    } else {
      const piece = game.getBoard().getPieceAt(position);
      if (piece) {
        setSelectedPosition(position);
        setAvailableMoves(piece.getAvailableMoves(game.getBoard()));
      }
    }
  };

  const board = game.getBoard();
  const capturedWhitePieces = game.getCapturedPieces().filter(p => p.color === PieceColor.White);
  const capturedBlackPieces = game.getCapturedPieces().filter(p => p.color === PieceColor.Black);
  const moveHistory = game.getMoveHistory();

  const getPieceSymbol = (piece: Piece): string => {
    switch (piece.type) {
      case 0: return piece.color === 0 ? '♙' : '♟';
      case 1: return piece.color === 0 ? '♖' : '♜';
      case 2: return piece.color === 0 ? '♘' : '♞';
      case 3: return piece.color === 0 ? '♗' : '♝';
      case 4: return piece.color === 0 ? '♕' : '♛';
      case 5: return piece.color === 0 ? '♔' : '♚';
      default: return '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '20px' }}>
          <h3>Captured White Pieces:</h3>
          <div>
            {capturedWhitePieces.map((piece, index) => (
              <span key={index} style={{ fontSize: '30px' }}>{getPieceSymbol(piece)}</span>
            ))}
          </div>
        </div>
        <div>
          <h3>Captured Black Pieces:</h3>
          <div>
            {capturedBlackPieces.map((piece, index) => (
              <span key={index} style={{ fontSize: '30px' }}>{getPieceSymbol(piece)}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 80px)' }}>
        {Array.from({ length: 64 }).map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const piece = board.getPieceAt({ row, col });
          const isLight = (row + col) % 2 !== 0;
          const isSelected = selectedPosition?.row === row && selectedPosition?.col === col;
          const isAvailableMove = availableMoves.some(move => move.row === row && move.col === col);

          return (
            <Square
              key={index}
              piece={piece}
              isLight={isLight}
              isSelected={isSelected}
              isAvailableMove={isAvailableMove}
              onClick={() => handleSquareClick({ row, col })}
            />
          );
        })}
      </div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      <div style={{ marginTop: '20px' }}>
        <h3>Move History:</h3>
        <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', width: '300px' }}>
          {moveHistory.map((move, index) => (
            <div key={index}>{move}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
