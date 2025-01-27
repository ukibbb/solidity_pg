"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Game } from "./types";
import {
  letsGambleContractAbi,
  letsGambleContractAddress,
} from "@/lib/blockchain/letsGamble";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { Address } from "viem";
import useGambleContractRead from "@/app/useGambleContractRead";
import { getStatus } from "./gamesUtils";

interface CreateGameInterface {
  game: Game;
  address?: Address;
}

const CreateGame: React.FC<CreateGameInterface> = ({
  game,
  address,
}: CreateGameInterface) => {
  const { getGameStatus } = useGambleContractRead();
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { data: gameStatus } = getGameStatus(address);

  console.log("CreateGame", gameStatus, game);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    writeContract({
      address: letsGambleContractAddress,
      abi: letsGambleContractAbi,
      functionName: "addGame",
      args: [
        {
          home: game.home,
          away: game.away,
          id: BigInt(game.id),
          timestamp: BigInt(game.timestamp),
          status: 0,
        },
      ],
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create Game {game.home} vs {game.away}
          </DialogTitle>
          <DialogDescription>Create game for gambling.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={onSubmit}>
            <Button disabled={isPending} type="submit">
              {isPending ? "Confirming..." : "Create Game"}
            </Button>
          </form>
        </DialogFooter>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default CreateGame;
