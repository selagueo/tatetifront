import React from "react";
import Tile from "./Tile";

const Board = ({ tiles, onClick }) => (
  <div className="board">
    {tiles.map((tile, i) => (
      <Tile key={i} value={tile} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
