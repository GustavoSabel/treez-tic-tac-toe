import { useState } from "react";
import Field from "../Field";
import Player from "../Player";
import { PlayerSymbol } from "../Types/PlayerSymbol";
import { CenterBlock, Container, CurrentPlayer, Game, NewGameButton } from "./style";

type Status = {
  status: 'playerWin' | 'draw' | null
  winner: PlayerSymbol | null,
  victory: ('W' | ' ')[]
}

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSymbol>('O')
  const [status, setStatus] = useState<Status>({
    status: 'playerWin',
    winner: 'X',
    victory: [
      'W', ' ', ' ',
      ' ', 'W', ' ',
      ' ', ' ', 'W',
    ]
  })
  const [game, setGame] = useState<(PlayerSymbol | ' ')[]>([
    'X', 'O', 'O',
    'O', 'X', 'X',
    'O', ' ', 'X',
  ]);
  const click = (index: number) => {
    if (game[index] === ' ') {
      const newGame = [...game]
      newGame[index] = currentPlayer
      setGame(newGame)
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
    }
  }
  const newGame = () => {
    setGame([
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' ',
    ])
    setStatus({
      status: null,
      winner: null,
      victory: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' ',
      ]
    })
  }
  return (
    <Container>
      <CenterBlock>
        <Game>
          {game.map((g, i) => (
            <Field
              onClick={() => click(i)}
              player={g === ' ' ? undefined : g}
              playerStatus={status.status === 'playerWin' && status.victory[i] === 'W' ? 'winner' : 'normal'} />
          ))}
        </Game>
        <br />
        <CurrentPlayer>
          <p>Current Player:</p>
          <Player player={currentPlayer} />
        </CurrentPlayer>
        {(status.status === 'playerWin' || status.status === 'draw') && <>
          <NewGameButton onClick={newGame}>New game</NewGameButton>
        </>}
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe