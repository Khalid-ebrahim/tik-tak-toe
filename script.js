/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let isGameOver = false

/*------------------------ Cached Element References ------------------------*/
squareEls.forEach((square, index) => {
  square.addEventListener('click', () => handleSquareClick(index))
})

document.addEventListener('DOMContentLoaded', init)
/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  isGameOver = false

  messageEl.textContent = "Player X's turn"
  squareEls.forEach((square) => {
    square.textContent = ''
    square.classList.remove('x', 'o')
    square.style.pointerEvents = 'auto'
  })
}

function updateBoard() {
  squareEls.forEach((square, index) => {
    const value = board[index]
    square.textContent = value
    square.classList.remove('x', 'o')
    if (value === 'X') {
      square.classList.add('x')
    } else if (value === 'O') {
      square.classList.add('o')
    }
  })

  if (isGameOver) {
    messageEl.textContent = `Game Over! Player ${turn} wins!`
  } else {
    messageEl.textContent = `Player ${turn}'s turn`
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let combo of winningCombinations) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}

function handleSquareClick(index) {
  if (board[index] || isGameOver) return

  board[index] = turn
  updateBoard()

  const winner = checkWinner()
  if (winner) {
    isGameOver = true
    messageEl.textContent = `Player ${winner} wins!`
    squareEls.forEach((square) => (square.style.pointerEvents = 'none'))
  } else {
    turn = turn === 'X' ? 'O' : 'X'
    messageEl.textContent = `Player ${turn}'s turn`
  }
}
