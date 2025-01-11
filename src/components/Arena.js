import Board from "./Board";
import { useState } from "react";
import { botLogic, checkWinner, Display } from "./utils/botLogic";
import { BOT, USER } from "./constant";

function Arena() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [display, setDisplay] = useState("Start");
  const move = async (index) => {
    board[index] = USER;
    const bot = await botLogic(board);
    board[bot] = BOT;
    setBoard([...board]);
    setDisplay(checkWinner(board));
  };
  const ifWon = Display(display).search("Win") !== -1;

  return (
    <div>
      <header>
        <h1>Tic-Tac-Toe</h1>
        <h2>
          <i>{Display(display)}</i>
        </h2>
      </header>

      <section>
        <Board board={board} move={move} ifWon={ifWon} />
      </section>
      <div>
        <button
          type="reset"
          className="start"
          onClick={() => {
            setBoard(Array(9).fill(null));
            setDisplay("Start");
          }}
        >
          {ifWon ? "Restart" : "Start"}
        </button>
      </div>
    </div>
  );
}
export default Arena;
