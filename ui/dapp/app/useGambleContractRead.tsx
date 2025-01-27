"use client";
import { useReadContract } from "wagmi";
import { gambleContractAbi } from "@/lib/blockchain/gambleContract";
import { Address } from "viem";

const useGambleContractRead = () => {
  const getGameStatus = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getGameStatus",
    });
  };
  const getGameInfo = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getGameInfo",
    });
  };
  const getHomePoolName = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getHomePoolName",
    });
  };
  const getAwayPoolName = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getAwayPoolName",
    });
  };
  const getHomePoolAmount = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getHomePoolAmount",
    });
  };
  const getAwayPoolAmount = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getAwayPoolAmount",
    });
  };
  const getHomeWagerAmount = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getHomeWagerAmount",
    });
  };
  const getAwayWagerAmount = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getAwayWagerAmount",
    });
  };
  const getTotalGameWagerAmount = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getTotalGameWagerAmount",
    });
  };
  const getHomeWagerPool = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getHomeWagerPool",
    });
  };
  const getAwayWagerPool = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getAwayWagerPool",
    });
  };
  const getGameGamblers = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getGameGamblers",
    });
  };
  const getHomeGamblers = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getHomeGamblers",
    });
  };
  const getAwayGamblers = (address?: Address) => {
    return useReadContract({
      address,
      abi: gambleContractAbi,
      functionName: "getAwayGamblers",
    });
  };

  return {
    getGameInfo,
    getGameStatus,
    getHomePoolName,
    getAwayPoolName,
    getHomePoolAmount,
    getAwayPoolAmount,
    getHomeWagerAmount,
    getAwayWagerAmount,
    getTotalGameWagerAmount,
    getHomeWagerPool,
    getAwayWagerPool,
    getGameGamblers,
    getHomeGamblers,
    getAwayGamblers,
  };
};

export default useGambleContractRead;
