import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  }
  function NewGame({ resetGame }) {
  return (
    <div className="m-4">
      <button
        onClick={resetGame}
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        🆕 New Game
      </button>
    </div>
  );
}


  function checkWinner(board) {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    const win = checkWinner(newBoard);

    if (win) {
      setWinner(win);
    } else {
      setIsXTurn(!isXTurn);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">Tic Tac Toe</h1>
{winner ? (
  <>
    <p className="text-3xl text-white font-bold mb-2">
      <span className="text-red-400 font-bold animate-pulse">
        🎉 Winner is {winner}!
      </span>
    </p>
    <NewGame resetGame={resetGame} />
  </>
) : board.every(cell => cell !== null) ? (
  <>
    <p className="text-3xl text-white font-bold mb-2 text-yellow-400">
      😐 It's a Draw!
    </p>
    <NewGame resetGame={resetGame} />
  </>
) : (
  <p className="text-3xl text-white font-bold mb-2">
    🔁 Turn:{" "}
    <span className="text-green-400">{isXTurn ? "X" : "O"}</span>
  </p>
)}



      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-white hover:bg-gray-100 transition-all duration-200 shadow-lg rounded-xl flex justify-center items-center text-3xl font-bold text-gray-800 cursor-pointer"
          >
            {value}
          </div>
        ))}
      </div>

      {/* Winner Message - For extra spacing */}
      {winner && (
        <p className="text-lg font-semibold text-yellow-300 mt-6 animate-bounce">
          🎊 Congratulations! {winner} wins!
        </p>
      )}

      {/* Reset Button */}
      <div className="mt-6">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          🔁 Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
