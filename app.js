import { createGame, playMove } from "./game.js";

let game = createGame();
let restartTimer;
const board = document.querySelector("[data-board]");
const resetButton = document.querySelector("[data-reset]");

function render() {
  const cells = game.board.map((value, index) => {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.type = "button";
    cell.dataset.index = index;
    cell.dataset.value = value || "empty";
    cell.textContent = value || "";
    cell.disabled = Boolean(value) || game.gameOver;
    cell.setAttribute("aria-label", value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`);
    return cell;
  });

  const winningLine = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  winningLine.classList.add("win-line");
  winningLine.setAttribute("viewBox", "0 0 3 3");
  winningLine.setAttribute("aria-hidden", "true");
  if (game.winningLine) {
    const [x1, y1, x2, y2] = getLineCoordinates(game.winningLine);
    const stroke = document.createElementNS("http://www.w3.org/2000/svg", "line");
    stroke.setAttribute("x1", String(x1));
    stroke.setAttribute("y1", String(y1));
    stroke.setAttribute("x2", String(x2));
    stroke.setAttribute("y2", String(y2));
    stroke.classList.add(`win-line--${game.winner.toLowerCase()}`);
    winningLine.append(stroke);
  }

  board.replaceChildren(...cells, winningLine);
  board.append(resetButton);
  resetButton.hidden = true;
  board.toggleAttribute("data-game-over", game.gameOver);

  if (game.gameOver) {
    restartTimer = window.setTimeout(() => {
      if (game.gameOver) {
        resetButton.hidden = false;
        resetButton.focus();
      }
    }, 3000);
  }
}

function getLineCoordinates(line) {
  const key = line.join(",");
  const coordinates = {
    "0,1,2": [0, 0.5, 3, 0.5],
    "3,4,5": [0, 1.5, 3, 1.5],
    "6,7,8": [0, 2.5, 3, 2.5],
    "0,3,6": [0.5, 0, 0.5, 3],
    "1,4,7": [1.5, 0, 1.5, 3],
    "2,5,8": [2.5, 0, 2.5, 3],
    "0,4,8": [0, 0, 3, 3],
    "2,4,6": [3, 0, 0, 3]
  };
  return coordinates[key];
}

board.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (!cell) return;
  game = playMove(game, Number(cell.dataset.index));
  render();
});

resetButton.addEventListener("click", () => {
  window.clearTimeout(restartTimer);
  game = createGame();
  render();
});

render();