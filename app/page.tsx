"use client";
import { useEffect, useState } from "react";
import Cell from "./components/cell";

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

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");
  const turnStyle = { fontWeight: "bold", fontSize: "30px", marginTop: "50px" };
  const winsStyle = { fontWeight: "bold", fontSize: "30px", marginTop: "50px" };

// Define initialCells
const initialCells = ["", "", "", "", "", "", "", "", ""];

  useEffect(() => {
    winningCombos.forEach((combo) => {
      const cirlceWins = combo.every((cell) => cells[cell] === "circle");
      const crossWins = combo.every((cell) => cells[cell] === "cross");

      if (cirlceWins) {
        setWinningMessage("Circle Wins");
      } else if (crossWins) {
        setWinningMessage("Cross Wins");
      }
    });
  }, [cells, winningMessage]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winningMessage) {
      setWinningMessage("Draw!");
    }
  }, [cells, winningMessage]);

  const restartGame = () => {
    setCells(initialCells);
    setWinningMessage("");
    setGo("circle");
  };

  return (
    <div className="container">
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            id={index}
            go={go}
            setGo={setGo}
            key={index}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <div
        style={{
          ...winsStyle,
          color: winningMessage.includes("Draw")
            ? "black"
            : winningMessage.includes("Circle")
            ? "blue"
            : "red",
        }}
      >
        {winningMessage}
      </div>
      {!winningMessage && <div style={turnStyle}>{`its now ${go} turn!`}</div>}
      <button onClick={restartGame} className="restartButton">Restart</button>
    </div>
  );
}
