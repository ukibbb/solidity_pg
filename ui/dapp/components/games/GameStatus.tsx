import useGambleContractRead from "../../app/useGambleContractRead";
import { Address } from "viem";
import { getStatus } from "./gamesUtils";

interface GameStatusProps {
  address?: Address;
}
const GameStatus = ({ address }: GameStatusProps) => {
  console.log(address);

  const { getGameStatus, getGameInfo } = useGambleContractRead();
  const { data: gameStatus } = getGameStatus(address);

  return <>{getStatus(gameStatus)}</>;
};
export default GameStatus;
