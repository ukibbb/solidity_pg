"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Address } from "viem";
import useGambleContractRead from "@/app/useGambleContractRead";

interface GameInfoProps {
  address?: Address;
}

const GameInfo = ({ address }: GameInfoProps) => {
  const { getGameInfo, getHomePoolAmount, getAwayPoolAmount, getGameGamblers } =
    useGambleContractRead();

  const { data: gameInfo } = getGameInfo(address);
  const { data: homePoolAmount } = getHomePoolAmount(address);
  const { data: awayPoolAmount } = getAwayPoolAmount(address);
  const { data: gamblers } = getGameGamblers(address);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Game Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>GameInfo</DialogTitle>
          <DialogDescription>
            Gamblers: {gamblers?.toString()}
            Make info about {gameInfo?.home} vs {gameInfo?.away}
            Money bet on home {homePoolAmount?.toString()}
            Money bet on away {awayPoolAmount?.toString()}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default GameInfo;
