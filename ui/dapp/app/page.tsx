"use client";
import { useWatchContractEvent } from "wagmi";
import GamesTable from "../components/games/GamesTable";
import BlockChainGamesTable from "@/components/games/BlockChainGamesTable";
import {
  letsGambleContractAbi,
  letsGambleContractAddress,
} from "@/lib/blockchain/letsGamble";
export default function Home() {
  useWatchContractEvent({
    address: letsGambleContractAddress,
    abi: letsGambleContractAbi,
    eventName: "GameCreated",
    onLogs(logs) {
      console.log("New logs", logs);
    },
  });
  return (
    <>
      <section>
        <BlockChainGamesTable />
        <GamesTable />
      </section>
    </>
  );
}
