import Square from "./Square";

function Board({ board, move, ifWon }) {
  return (
    <div className="board">
      {board.map((val, i) => (
        <Square
          player={val}
          move={() => move(i)}
          key={i + val}
          index={i}
          ifWon={ifWon}
        />
      ))}
    </div>
  );
}
export default Board;
