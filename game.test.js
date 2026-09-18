import test from "node:test";
import assert from "node:assert/strict";
import { createGame, getWinner, getWinningLine, playMove, PLAYERS } from "./game.js";

test("alternates turns and rejects occupied cells", () => {
  let game = createGame();
  game = playMove(game, 0);
  assert.equal(game.board[0], PLAYERS.X);
  assert.equal(game.currentPlayer, PLAYERS.O);
  assert.deepEqual(playMove(game, 0), game);
});

test("detects a winner and stops the game", () => {
  let game = createGame();
  for (const index of [0, 3, 1, 4, 2]) game = playMove(game, index);
  assert.equal(game.winner, PLAYERS.X);
  assert.deepEqual(game.winningLine, [0, 1, 2]);
  assert.equal(game.gameOver, true);
  assert.equal(getWinner(game.board), PLAYERS.X);
  assert.deepEqual(playMove(game, 5), game);
});

test("detects a draw", () => {
  let game = createGame();
  for (const index of [0, 1, 2, 4, 3, 5, 7, 6, 8]) game = playMove(game, index);
  assert.equal(game.winner, "Draw");
  assert.equal(game.gameOver, true);
});

test("supports both diagonal wins", () => {
  const downRight = ["O", "X", null, "X", "O", null, "X", null, "O"];
  const upRight = ["X", null, "O", null, "O", "X", "O", null, "X"];
  assert.equal(getWinner(downRight), PLAYERS.O);
  assert.deepEqual(getWinningLine(downRight), [0, 4, 8]);
  assert.equal(getWinner(upRight), PLAYERS.O);
  assert.deepEqual(getWinningLine(upRight), [2, 4, 6]);
});