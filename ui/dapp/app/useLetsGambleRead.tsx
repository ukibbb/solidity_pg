"use client";
import { useReadContract } from "wagmi";
import {
  letsGambleContractAddress,
  letsGambleContractAbi,
} from "../lib/blockchain/letsGamble";

const useLetsGambleRead = () => {
  const getGamesCount = () => {
    return useReadContract({
      abi: letsGambleContractAbi,
      address: letsGambleContractAddress,
      functionName: "getGamesCount",
    });
  };

  const getGames = () => {
    return useReadContract({
      abi: letsGambleContractAbi,
      address: letsGambleContractAddress,
      functionName: "getGames",
    });
  };

  const getLastGame = () => {
    return useReadContract({
      abi: letsGambleContractAbi,
      address: letsGambleContractAddress,
      functionName: "getLastGame",
    });
  };

  return { getGamesCount, getGames, getLastGame };
};

export default useLetsGambleRead;
