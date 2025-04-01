```jsx
import {useRef, useState} from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(false);
  const boardRef = useRef(board);

  const checkWinner = (board) => {
    const winningSequence = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (let sequence of winningSequence) {
      const [a, b, c] = sequence;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log(board[a], 'won');
        return board[a];
      }
    }

    return null;
  };

  const handleBoxClick = (i) => {
    if (board[i] || checkWinner(boardRef.current)) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = isXTurn ? 'x' : 'o';
    boardRef.current = newBoard;
    checkWinner(boardRef.current);
    setBoard(newBoard);
    setIsXTurn((prev) => !prev);
    checkWinner(board);
  };

  return (
    <div className="board">
      {board.map((box, i) => (
        <div className="box" onClick={() => handleBoxClick(i)} key={i}>
          {box}
        </div>
      ))}
    </div>
  );
};

export default TicTacToe;
```
