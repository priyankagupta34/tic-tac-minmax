function Square({ player, move, ifWon }) {
  return (
    <button type="button" onClick={move} disabled={ifWon}>
      {player}
    </button>
  );
}
export default Square;
