import React, { useState } from "react";
import "./App.css";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

export default function App() {
  const [board, setBoard] = useState(
    Array(9).fill("")
  );
  const [player, setPlayer] = useState("X");

  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  function play(index) {
    if (board[index] || winner || draw) return;

    const nextBoard = [...board];
    nextBoard[index] = player;

    setBoard(nextBoard);
    setPlayer(player === "X" ? "O" : "X");
  }

  function restart() {
    setBoard(Array(9).fill(""));
    setPlayer("X");
  }

  return (
    <div className="game">
      <h1>Knots and Crosses</h1>

      <p className="status">
        {winner
          ? `Player ${winner} wins! 🎉`
          : draw
          ? "It's a draw!"
          : `Player ${player}'s turn`}
      </p>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`square ${cell.toLowerCase()}`}
            onClick={() => play(index)}
            disabled={!!cell || !!winner || draw}
            aria-label={`Square ${index + 1}: ${
              cell || "empty"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="restart" onClick={restart}>
        Restart Game
      </button>
    </div>
  );
}