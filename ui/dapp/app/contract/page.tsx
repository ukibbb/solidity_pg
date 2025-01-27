"use client";
import useLetsGambleRead from "../useLetsGambleRead";

const Contract = () => {
  const { getGames, getGamesCount, getLastGame } = useLetsGambleRead();
  const { data: games } = getGames();
  const { data: gamesCount } = getGamesCount();
  const { data: lastGame } = getLastGame();
  console.log("contract", games, gamesCount, lastGame)
  return (
    <div>
    </div>
  );
};
export default Contract;
