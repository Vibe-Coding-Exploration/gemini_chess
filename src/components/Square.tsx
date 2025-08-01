
import React from 'react';
import { Piece } from '../pieces/Piece';

interface SquareProps {
  piece: Piece | null;
  isLight: boolean;
  isSelected: boolean;
  isAvailableMove: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ piece, isLight, isSelected, isAvailableMove, onClick }) => {
  const backgroundColor = isSelected
    ? '#c3e1f7'
    : isAvailableMove && piece
    ? '#f7a7a7'
    : isLight
    ? '#f0d9b5'
    : '#b58863';

  return (
    <div
      onClick={onClick}
      style={{
        width: '80px',
        height: '80px',
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '50px',
        cursor: 'pointer',
      }}
    >
      {isAvailableMove && !piece && (
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
      )}
      {piece && <span>{getPieceSymbol(piece)}</span>}
    </div>
  );
};

function getPieceSymbol(piece: Piece): string {
  switch (piece.type) {
    case 0: return piece.color === 0 ? '♙' : '♟';
    case 1: return piece.color === 0 ? '♖' : '♜';
    case 2: return piece.color === 0 ? '♘' : '♞';
    case 3: return piece.color === 0 ? '♗' : '♝';
    case 4: return piece.color === 0 ? '♕' : '♛';
    case 5: return piece.color === 0 ? '♔' : '♚';
    default: return '';
  }
}

export default Square;
