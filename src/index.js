import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = ({ value, clicked }) => {
  return (
    <button className="square" onClick={clicked}>
      {value}
    </button>
  );
};

const Board = ({ val, clicked }) => {
  const renderSquare = i => (
    <Square value={val[i]} clicked={() => clicked(i)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [val, setVal] = useState(Array(9).fill(""));
  const [nextPlayer, setNextPlayer] = useState("X");
  const [history, setHistory] = useState([]);

  const clicked = i => {
    setVal(val.map((item, idx) => (idx === i ? nextPlayer : item)));
    setHistory([...history, { position: i, value: nextPlayer }]);
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
  };

  const moves = history.map(({ position, value }, idx) => {
    console.log(idx, position, value);
    return (
      <li key={position}>
        {idx}, {position}, {value}
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board val={val} clicked={clicked} />
      </div>
      <div className="game-info">
        <div className="status">Next player: {nextPlayer}</div>
        {console.log(moves)}
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
