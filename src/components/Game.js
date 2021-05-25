import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Tile from "./Tile";
import Board from "./Board";

const Game = () => {
  //Se inicia el historial con un array de 3x3 vacio.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //Numero del turno, inicia en 0.
  const [stepNumber, setStepNumber] = useState(0);
  //Turnos de X o O. (X siempre empieza primero)
  const [xIsNext, setXisNext] = useState(true);
  //Histori es un array que va a validar si hay una combinacion ganadora
  const winner = calculateWinner(history[stepNumber]);
  //Manejo de turnos con un if.
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const tiles = [...current]; //copia de nuestro historial actual.
    //retorno si gano en ocupado
    if (winner || tiles[i]) return; //se termina el juego y no deja agregar clicks
    //seleccionar tile
    tiles[i] = xO;
    setHistory([...historyPoint, tiles]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  //historial con revisado de movimiento
  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Movimiento Numero #${move}` : "Nueva Partida";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  
  //Retorno de web
  return (
    <>
      <h1> Ta Te Ti para Programacion Avanzada</h1>
      <Board tiles={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>Historial de Movimientos</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Ganador: " + winner : "Turno de: " + xO}</h3>
      </div>
    </>
  );
};

export default Game;
