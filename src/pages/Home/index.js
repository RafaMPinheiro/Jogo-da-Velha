import { useState } from 'react'
import raposa from '../../images/raposa.png'
import coelho from '../../images/coelho.png'
import crocodilo from '../../images/crocodilo.png'
import './home.css'
import Game from '../Game'

export default function Home() {
  const [firstPlayer, setFirstPlayer] = useState('')
  const [secondPlayer, setSecondPlayer] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const SelectFirstCaracter = (caracter) => {
    if (caracter.target.alt !== secondPlayer) {
      setFirstPlayer(caracter.target.alt)
    }
  }

  const SelectSecondCaracter = (caracter) => {
    if (caracter.target.alt !== firstPlayer) {
      setSecondPlayer(caracter.target.alt)
      setGameStarted(true)
    }
  }

  const StartGame = () => {
    setShowGame(true)
  }

  return (
    <div className="home">
      <div className="neumorphism" hidden={showGame}>
        <div className="content">
          <h1 className="bem-vindo">Bem-Vindo ao jogo da velha!</h1>
          <h3 className="select">Selecione seu personagem:</h3>
          <div className="characters">
            <div className="character">
              <h4>Primeiro jogador:</h4>
              <button
                className={`button ${
                  firstPlayer === 'raposa' ? 'selected' : ''
                } ${secondPlayer === 'raposa' ? 'disabled' : ''}`}
                onClick={SelectFirstCaracter}
              >
                <img src={raposa} alt="raposa" />
              </button>
              <button
                className={`button ${
                  firstPlayer === 'coelho' ? 'selected' : ''
                } ${secondPlayer === 'coelho' ? 'disabled' : ''}`}
                onClick={SelectFirstCaracter}
              >
                <img src={coelho} alt="coelho" />
              </button>
              <button
                className={`button ${
                  firstPlayer === 'crocodilo' ? 'selected' : ''
                } ${secondPlayer === 'crocodilo' ? 'disabled' : ''}`}
                onClick={SelectFirstCaracter}
              >
                <img src={crocodilo} alt="crocodilo" />
              </button>
            </div>
            <div className="character">
              <h4>Segundo jogador:</h4>
              <button
                className={`button ${
                  secondPlayer === 'raposa' ? 'selected' : ''
                } ${firstPlayer === 'raposa' ? 'disabled' : ''}`}
                onClick={SelectSecondCaracter}
              >
                <img src={raposa} alt="raposa" />
              </button>
              <button
                className={`button ${
                  secondPlayer === 'coelho' ? 'selected' : ''
                } ${firstPlayer === 'coelho' ? 'disabled' : ''}`}
                onClick={SelectSecondCaracter}
              >
                <img src={coelho} alt="coelho" />
              </button>
              <button
                className={`button ${
                  secondPlayer === 'crocodilo' ? 'selected' : ''
                } ${firstPlayer === 'crocodilo' ? 'disabled' : ''}`}
                onClick={SelectSecondCaracter}
              >
                <img src={crocodilo} alt="crocodilo" />
              </button>
            </div>
          </div>
          <button
            className={`button-start ${gameStarted ? 'ready' : ''}`}
            onClick={StartGame}
          >
            <h4>JOGAR</h4>
          </button>
        </div>
      </div>
      {showGame && <Game playerOne={firstPlayer} playerTwo={secondPlayer} />}
    </div>
  )
}
