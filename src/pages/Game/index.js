import './game.css'
import { useEffect, useState } from 'react'
import raposa from '../../images/raposa.png'
import coelho from '../../images/coelho.png'
import crocodilo from '../../images/crocodilo.png'
import '../Home'
import { Link } from 'react-router-dom'

export default function Game({ playerOne, playerTwo }) {
  const emptyBoard = Array(9).fill('')
  const [board, setBoard] = useState(emptyBoard)
  const [winner, setWinner] = useState('')
  const [player, setPlayer] = useState(playerOne)
  const [win, setWin] = useState('')
  let [count, setCount] = useState(1)

  const ClickButton = (index) => {
    setCount(count + 1)
    if (board[index] === '') {
      board[index] = player
      setBoard([...board])
    }
    if (player === playerOne) {
      setPlayer(playerTwo)
    } else {
      setPlayer(playerOne)
    }
    setInterval(() => {
      if (count === 9) {
        setWinner('Empate')
        count = 1
      }
    }, 200)
  }

  const VerificaWinner = () => {
    const possiblesWinner = [
      //linhas
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      //colunas
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      //diagonais
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ]

    possiblesWinner.forEach((cells) => {
      if (cells.every((cell) => cell === playerOne)) setWinner('Player One')
      if (cells.every((cell) => cell === playerTwo)) setWinner('Player Two')
    })
  }

  if (winner === 'Empate' && win === '') {
    setWin('It was a tie!')
  } else if (winner !== '' && win === '') {
    setWin(` ${winner} wins!`)
  }

  useEffect(VerificaWinner, [board])

  const ResetGame = () => {
    setBoard(emptyBoard)
    setPlayer(playerOne)
    setWinner('')
    setWin('')
    setCount((count = 1))
  }

  const img = (index) => {
    if (index === 'raposa') {
      return raposa
    } else if (index === 'coelho') {
      return coelho
    } else if (index === 'crocodilo') {
      return crocodilo
    }
  }

  const Home = () => {
    window.location.reload(true)
  }

  return (
    <div className="neumorphism">
      <div className={`tabuleiro ${winner ? 'game-over' : ''}`}>
        {board.map((item, index) => (
          <button
            className={`button ${winner ? 'game-over' : ''}`}
            key={index}
            onClick={() => ClickButton(index)}
            disabled={winner ? true : false}
          >
            {item === '' ? (
              ''
            ) : (
              <img src={img(item)} alt={item} className={item} />
            )}
          </button>
        ))}
      </div>
      <h1 className={`end ${winner !== '' ? 'game-over' : ''}`}>{win}</h1>
      <div className={`div-end ${winner !== '' ? 'game-over' : ''}`}>
        <button
          className={`button-end ${winner !== '' ? 'game-over' : ''}`}
          onClick={ResetGame}
        >
          <h4>RESET</h4>
        </button>
        <button
          className={`button-end ${winner !== '' ? 'game-over' : ''}`}
          onClick={Home}
        >
          <h4>HOME</h4>
        </button>
      </div>
    </div>
  )
}
