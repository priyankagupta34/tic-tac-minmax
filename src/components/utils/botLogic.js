import { BOT, USER } from "../constant";

export function botLogic(board) {
  if (board.indexOf(null) === -1) return;
  return new Promise((resolve) => {
    const gh = minMax(board, true);
    setTimeout(() => resolve(gh.index), 300);
  });
}

function minMax(board, maximizig) {
  const winner = checkWinner(board).val;

  // Base cases
  if (winner === BOT) return { score: 10 };
  if (winner === USER) return { score: -10 };
  if (winner === "Draw") return { score: 0 };
  if (maximizig) {
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestIndex = -1;
    for (let i = 0; i < 10; i++) {
      if (board[i] === null) {
        board[i] = BOT;
        const { score } = minMax(board, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestIndex = i;
        }
      }
    }
    return { score: bestScore, index: bestIndex };
  }
  let bestScore = Number.POSITIVE_INFINITY;
  let bestIndex = -1;
  for (let i = 0; i < 10; i++) {
    if (board[i] === null) {
      board[i] = USER;
      const { score } = minMax(board, true);
      board[i] = null;
      if (score < bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }
  }
  return { score: bestScore, index: bestIndex };
}

export function checkWinner(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { val: board[a], combo: [a, b, c] };
    }
  }
  if (board.every((i) => i !== null)) return { val: "Draw" };
  return { val: "Progress" };
}

export function Display(state) {
  switch (state) {
    case BOT:
      return "Bot Wins";
    case USER:
      return "You Win";
    case "Draw":
      return "It's a Draw";
    default:
      return "Game in Progress";
  }
}
