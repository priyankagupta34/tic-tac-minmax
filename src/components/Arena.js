import Board from "./Board";
import { useRef, useState } from "react";
import { botLogic, checkWinner, Display } from "./utils/botLogic";
import { BOT, USER } from "./constant";

function Arena() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [display, setDisplay] = useState("Start");
  const ref = useRef();
  const move = async (index) => {
    board[index] = USER;
    const bot = await botLogic(board);
    board[bot] = BOT;
    setBoard([...board]);
    const { val, combo } = checkWinner(board);
    if (val === BOT || val === USER) {
      if (ref.current) {
        const allVals = ref.current.children;
        setTimeout(() => {
          allVals[combo[0]].style.color = "#59cd2c";
          allVals[combo[1]].style.color = "#59cd2c";
          allVals[combo[2]].style.color = "#59cd2c";
        }, 300);
      }
    }
    setDisplay(val);
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
        <Board board={board} move={move} ifWon={ifWon} ref={ref} />
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
