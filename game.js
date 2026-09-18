export const PLAYERS = Object.freeze({
  X: "X",
  O: "O"
});

export const WINNING_LINES = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]);

export function createGame() {
  return {
    board: Array(9).fill(null),
    currentPlayer: PLAYERS.X,
    winner: null,
    winningLine: null,
    gameOver: false
  };
}

export function playMove(game, index) {
  if (game.gameOver || !Number.isInteger(index) || index < 0 || index > 8 || game.board[index]) {
    return game;
  }

  const board = [...game.board];
  board[index] = game.currentPlayer;
  const winningLine = getWinningLine(board);
  const winner = winningLine ? board[winningLine[0]] : null;
  const gameOver = Boolean(winner) || board.every(Boolean);

  return {
    board,
    currentPlayer: winner || gameOver ? game.currentPlayer : switchPlayer(game.currentPlayer),
    winner: winner || (gameOver ? "Draw" : null),
    winningLine,
    gameOver
  };
}

export function getWinner(board) {
  const winningLine = getWinningLine(board);
  return winningLine ? board[winningLine[0]] : null;
}

export function getWinningLine(board) {
  return WINNING_LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) || null;
}

function switchPlayer(player) {
  return player === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
}