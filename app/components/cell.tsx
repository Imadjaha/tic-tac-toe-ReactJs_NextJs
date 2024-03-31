import React, { Dispatch, SetStateAction } from "react";

type CellProps = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: ("circle" | "cross" | "")[];
  setCells: Dispatch<SetStateAction<("circle" | "cross" | "")[]>>;
  cell: string;
  winningMessage: string;
};

const Cell = ({
  go,
  setGo,
  id,
  cells,
  setCells,
  cell,
  winningMessage,
  
}: CellProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (winningMessage) {
      return;
    }

    const notTaken = !cells[id];

    if (notTaken) {
      if (go === "circle") {
        handleCellChange("circle");
        setGo("cross");
      } else if (go === "cross") {
        handleCellChange("cross");
        setGo("circle");
      }
    }
  };

  const handleCellChange = (cellToChange: string) => {
    let copyCells = [...cells];
    copyCells[id] = cellToChange;
    setCells(copyCells);
  };
  return (
    <div className="square" onClick={handleClick}>
      <div className={cell}>
       
        {cell ? (cell === "circle" ? "O" : "X") : ""}{" "}
      </div>
    </div>
  );
};

export default Cell;


