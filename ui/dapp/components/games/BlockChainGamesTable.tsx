"use client";
import useGambleContractRead from "../../app/useGambleContractRead";
import useLetsGambleRead from "../../app/useLetsGambleRead";
import { Game } from "./types";
import { DataTable } from "../data-table";
import { columns } from "./column-definition";
import { GameDefinition } from "./types";

const BlockChainGamesTable: React.FC = () => {
  const { getGames } = useLetsGambleRead();
  const { getGameInfo } = useGambleContractRead();

  const getGame = (game: Game) => {
    return {
      home: game.home,
      away: game.away,
      timestamp: game.timestamp,
      id: game.id,
      status: game.status,
    };
  };

  // games from api
  const { data: onTheBlockChain } = getGames();

  const fromTheBlockChain: GameDefinition[] | undefined = onTheBlockChain?.map(
    (letsGambleGame) => ({
      game: getGame(letsGambleGame.game),
      gambleContract: letsGambleGame.gambleContract,
    })
  );
  console.log("From the Blockchain", fromTheBlockChain);
  return (
    <section>
      Blockchain games:
      {fromTheBlockChain && (
        <DataTable columns={columns} data={fromTheBlockChain} />
      )}
    </section>
  );
};
export default BlockChainGamesTable;
