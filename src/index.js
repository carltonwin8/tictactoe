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
  const [history, setHistory] = useState([
    { text: "Go to game start", position: -1, value: "X" }
  ]);

  const clicked = i => {
    if (val[i] !== "") return;
    setHistory([
      ...history,
      {
        position: i,
        value: nextPlayer,
        text: `Go to move #${history.length}`
      }
    ]);
    setVal(val.map((item, idx) => (idx === i ? nextPlayer : item)));

    setNextPlayer(nextPlayer === "X" ? "O" : "X");
  };

  const clickedHistory = (idx, position, value) => {
    setNextPlayer(idx === 0 ? "X" : history[idx].value === "X" ? "O" : "X");
    const newVal = Array(9).fill("");
    for (let i = 1; i <= idx; i++)
      newVal[history[i].position] = history[i].value;
    setVal(newVal);
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board val={val} clicked={clicked} />
      </div>
      <div className="game-info">
        <div className="status">Next player: {nextPlayer}</div>
        <ol>
          {history.map(({ position, value, text }, idx) => (
            <li key={position}>
              <button onClick={() => clickedHistory(idx, position, value)}>
                {text}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
