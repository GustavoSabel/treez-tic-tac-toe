import { useState } from "react";
import Field from "../Field";
import Player from "../Player";
import { PlayerSymbol } from "../Player/PlayerSymbol";
import { CenterBlock, Container, CurrentPlayer, Game } from "./style";

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSymbol>('O')
  const [game, setGame] = useState<(PlayerSymbol | ' ')[]>([
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ]);
  const click = (index: number) => {
    if (game[index] === ' ') {
      const newGame = [...game]
      newGame[index] = currentPlayer
      setGame(newGame)
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
    }
  }
  return (
    <Container>
      <CenterBlock>
        <Game>
          {game.map((g, i) => (
            <Field onClick={() => click(i)}>
              {g === ' ' ? null : <Player player={g} />}
            </Field>
          ))}
        </Game>
        <br/>
        <CurrentPlayer>
          <p>Current Player:</p>
          <Player player={currentPlayer} />
        </CurrentPlayer>
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe