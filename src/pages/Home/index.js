import { useState } from 'react'
import Raposa from '../../images/raposa.png'
import Coelho from '../../images/coelho.png'
import Crocodilo from '../../images/crocodilo.png'
import GitHub from '../../images/github.png'

import { db } from '../../firebase/config'

import { doc, updateDoc } from 'firebase/firestore'

import './home.css'

export default function Home() {
  const [firstPlayer, setFirstPlayer] = useState('')
  const [secondPlayer, setSecondPlayer] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const SelectFirstCaracter = (caracter) => {
    if (caracter.target.alt !== secondPlayer) {
      setFirstPlayer(caracter.target.alt)
    }
  }

  const SelectSecondCaracter = (caracter) => {
    if (caracter.target.alt !== firstPlayer && firstPlayer !== '') {
      setSecondPlayer(caracter.target.alt)
      setGameStarted(true)
    }
  }

  const StartGame = async () => {
    const q = doc(db, 'game', 'b0tRj1IZEp3C4lvbmN84')
    await updateDoc(q, {
      playerOne: firstPlayer, // Salva os personagens no banco de dados
      playerTwo: secondPlayer, // Salva os personages no banco de dados
    })
    setRedirect(true)
  }

  if (redirect) {
    window.location.href = '/game'
  } else {
    return (
      <div className="home">
        <a
          className="github"
          href="https://github.com/RafaMPinheiro/Jogo-da-Velha.git"
        >
          <img src={GitHub} alt="GitHub" className="github-image" />
          <h3>GitHub</h3>
        </a>
        <div className="neumorphism">
          <div className="content">
            <h1 className="bem-vindo">Bem-Vindo ao jogo da velha!</h1>
            <h3 className="select">Selecione seu personagem:</h3>
            <div className="characters">
              <div className="character">
                <h4>Primeiro jogador:</h4>
                <button
                  className={`button ${
                    firstPlayer === 'Raposa' ? 'selected' : ''
                  } ${secondPlayer === 'Raposa' ? 'disabled' : ''}`}
                  onClick={SelectFirstCaracter}
                >
                  <img src={Raposa} alt="Raposa" />
                </button>
                <button
                  className={`button ${
                    firstPlayer === 'Coelho' ? 'selected' : ''
                  } ${secondPlayer === 'Coelho' ? 'disabled' : ''}`}
                  onClick={SelectFirstCaracter}
                >
                  <img src={Coelho} alt="Coelho" />
                </button>
                <button
                  className={`button ${
                    firstPlayer === 'Crocodilo' ? 'selected' : ''
                  } ${secondPlayer === 'Crocodilo' ? 'disabled' : ''}`}
                  onClick={SelectFirstCaracter}
                >
                  <img src={Crocodilo} alt="Crocodilo" />
                </button>
              </div>
              <div className="character">
                <h4>Segundo jogador:</h4>
                <button
                  className={`button ${
                    secondPlayer === 'Raposa' ? 'selected' : ''
                  } ${firstPlayer === 'Raposa' ? 'disabled' : ''}`}
                  onClick={SelectSecondCaracter}
                >
                  <img src={Raposa} alt="Raposa" />
                </button>
                <button
                  className={`button ${
                    secondPlayer === 'Coelho' ? 'selected' : ''
                  } ${firstPlayer === 'Coelho' ? 'disabled' : ''}`}
                  onClick={SelectSecondCaracter}
                >
                  <img src={Coelho} alt="Coelho" />
                </button>
                <button
                  className={`button ${
                    secondPlayer === 'Crocodilo' ? 'selected' : ''
                  } ${firstPlayer === 'Crocodilo' ? 'disabled' : ''}`}
                  onClick={SelectSecondCaracter}
                >
                  <img src={Crocodilo} alt="Crocodilo" />
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
      </div>
    )
  }
}
