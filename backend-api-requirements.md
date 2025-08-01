
# Backend API Requirements for Chess Game

## 1. Overview

This document outlines the requirements for the backend API of a chess game. The API will be responsible for managing the game state, validating moves, and providing the necessary data to the frontend.

## 2. Endpoints

### 2.1. `POST /api/game/new`

This endpoint creates a new game and returns the initial game state.

**Request Body:**

None

**Response Body:**

```json
{
  "gameId": "unique-game-id",
  "board": [
    [
      { "type": "Rook", "color": "Black" },
      { "type": "Knight", "color": "Black" },
      { "type": "Bishop", "color": "Black" },
      { "type": "Queen", "color": "Black" },
      { "type": "King", "color": "Black" },
      { "type": "Bishop", "color": "Black" },
      { "type": "Knight", "color": "Black" },
      { "type": "Rook", "color": "Black" }
    ],
    // ... rows for pawns and empty squares
    [
      { "type": "Rook", "color": "White" },
      { "type": "Knight", "color": "White" },
      { "type": "Bishop", "color": "White" },
      { "type": "Queen", "color": "White" },
      { "type": "King", "color": "White" },
      { "type": "Bishop", "color": "White" },
      { "type": "Knight", "color": "White" },
      { "type": "Rook", "color": "White" }
    ]
  ],
  "turn": "White",
  "history": []
}
```

### 2.2. `POST /api/game/{gameId}/move`

This endpoint validates and executes a move, and returns the updated game state.

**Request Body:**

```json
{
  "from": { "row": 6, "col": 4 },
  "to": { "row": 4, "col": 4 }
}
```

**Response Body (Success):**

```json
{
  "gameId": "unique-game-id",
  "board": [ ... ], // Updated board state
  "turn": "Black",
  "history": [ "e2e4" ]
}
```

**Response Body (Error):**

```json
{
  "error": "Invalid move"
}
```

### 2.3. `GET /api/game/{gameId}`

This endpoint returns the current state of a game.

**Response Body:**

```json
{
  "gameId": "unique-game-id",
  "board": [ ... ],
  "turn": "White",
  "history": []
}
```

## 3. Data Structures

### 3.1. `Piece`

```typescript
interface Piece {
  type: 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'Queen' | 'King';
  color: 'White' | 'Black';
}
```

### 3.2. `Position`

```typescript
interface Position {
  row: number;
  col: number;
}
```

### 3.3. `Game`

```typescript
interface Game {
  gameId: string;
  board: (Piece | null)[][];
  turn: 'White' | 'Black' | 'CheckmateWhite' | 'CheckmateBlack';
  history: string[];
}
```

## 4. Game Logic

The backend will be responsible for the following:

- **Move Validation:** The API will validate all moves according to the rules of chess.
- **Check/Checkmate Detection:** The API will detect when a player is in check or checkmate.
- **Game History:** The API will maintain a history of all moves made in the game.
- **Player Turns:** The API will enforce the correct turn order.
