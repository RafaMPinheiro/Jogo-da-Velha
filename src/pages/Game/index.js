import './game.css'
import { useState } from 'react'

import Raposa from '../../images/raposa.png'
import Coelho from '../../images/coelho.png'
import Crocodilo from '../../images/crocodilo.png'
import GitHub from '../../images/github.png'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default function Game() {
  const emptyBoard = Array(9).fill('')
  const [board, setBoard] = useState(emptyBoard)
  const [winner, setWinner] = useState('')
  const [player, setPlayer] = useState('')
  const [win, setWin] = useState('')
  let [count, setCount] = useState(1)

  const [playerOne, setPlayerOne] = useState(' ')
  const [playerTwo, setPlayerTwo] = useState(' ')

  const getPlayers = async () => {
    const q = query(
      collection(db, 'game'),
      where('id', '==', 'b0tRj1IZEp3C4lvbmN84'),
    )
    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      setPlayerOne(doc.data().playerOne)
      setPlayerTwo(doc.data().playerTwo)
      if (player === '') setPlayer(doc.data().playerOne)
    })
  }
  getPlayers()

  const ClickButton = (index) => {
    if (board[index] === '') {
      board[index] = player
      setBoard([...board])
      setCount(count + 1)
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
    VerificaWinner()
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
      if (cells.every((cell) => cell === playerOne)) setWinner(playerOne)
      if (cells.every((cell) => cell === playerTwo)) setWinner(playerTwo)
    })
  }

  if (winner === 'Empate' && win === '') {
    setWin('It was a tie!')
    setWinner(playerOne)
  } else if (winner !== '' && win === '') {
    setWin(` ${winner} wins!`)
  }

  const ResetGame = () => {
    setBoard(emptyBoard)
    setPlayer(winner)
    setWinner('')
    setWin('')
    setCount((count = 1))
  }

  const img = (index) => {
    if (index === 'Raposa') {
      return Raposa
    } else if (index === 'Coelho') {
      return Coelho
    } else if (index === 'Crocodilo') {
      return Crocodilo
    }
  }

  const [home, setHome] = useState(false)
  const Home = () => {
    setHome(true)
  }

  if (home) {
    window.location.href = '/'
  } else {
    return (
      <div className="game">
        <a
          className="github"
          href="https://github.com/RafaMPinheiro/Jogo-da-Velha.git"
        >
          <img src={GitHub} alt="GitHub" className="github-image" />
          <h3>GitHub</h3>
        </a>
        <div className="neumorphism">
          <h1
            className={`title ${winner ? 'game-over' : ''}`}
          >{`Próximo a jogar: ${player}`}</h1>
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
      </div>
    )
  }
}
