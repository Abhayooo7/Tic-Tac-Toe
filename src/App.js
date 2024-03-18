import { useState } from 'react';

function Square({ val, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick} >
      {val}
    </button>
  );
}

function Board({ x, squares, onPlay}){
  function handleClick(i) {
    if(squares[i] || calculateTheWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    if(x) {
      nextSquare[i] = 'X';
    } else {
      nextSquare[i] = 'O';
    }
    onPlay(nextSquare);
  }

  const winner = calculateTheWinner(squares);
  let status;
  if (winner) {
    status = 'Winner is: ' + winner;
  } else if (squares.every(square => square)) {
    status = 'It\'s a draw!';
  } else {
    status = 'Next player is: ' + (x ? 'X' : 'O');
  }

  return (
    <>
      <div className="game-name">Tic-Tac-Toe</div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square val={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square val={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square val={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square val={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square val={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square val={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square val={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square val={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square val={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [curMove, setCurMove] = useState(0);
  const x = curMove % 2 === 0;
  const curSquare = history[curMove];

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, curMove + 1), nextSquare]
    setHistory(nextHistory);
    setCurMove(nextHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <div className='move-buttons-container' key={move}>
       <button className='move-button' onClick={() => jumpTo(move)}>{description}</button>
      </div>
    );
  });

  return (
    <div className="game">
      <div className="board-game">
        <Board x={x} squares={curSquare} onPlay={handlePlay} />
      </div>  
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateTheWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for ( let i=0; i<lines.length;i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}