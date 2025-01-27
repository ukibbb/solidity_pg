import { ethers, network } from "hardhat";
import { LetsGamble } from "../typechain-types";
import { randomInt } from "crypto";
import { AddressLike, Addressable, TransactionResponse } from "ethers";

const getRandomFuture = (now: number) => {
  return now + randomInt(0, 1_000);
};
const getRandomPast = (now: number) => {
  return now - randomInt(0, 1_000);
};

export const getFuture = (now: number) => {
  return now + 1_099;
};

export const getPast = (now: number) => {
  return now - 1_099;
};

export async function deployLetsGamble() {
  const config = {
    oracle: "", // address of chanlink oracle
    ccipRouter: "", // The address of the Chainlink CCIP router
    link: "", // The address of the LINK token
    weth9Token: "", // The address of the WETH9 token
    exchangeToken: "", // The address of the exchange token used to transfer native tokens
    uniswapV3Router: "", // The address of the Uniswap V3 router
    subscriptionId: "", // The ID of the Chainlink Functions subscription
    destinationChainSelector: "", // The chain selector for the winnings transfer destination chain
    donId: "", // The ID of the Chainlink oracle network
    secrets: "", // The secrets for the Chainlink Functions request
    source: "",
  };

  // Contracts are deployed using the first signer/account by default
  const [origin, receiver] = await ethers.getSigners();
  const WPLS = await ethers.getContractFactory("WPLS");
  const wPLS = await WPLS.deploy();

  const PulseXFactory = await ethers.getContractFactory("PulseXFactory");
  const pulseXFactory = await PulseXFactory.deploy(origin);

  const PulseX = await ethers.getContractFactory("PulseXRouter02");
  const pulseX = await PulseX.deploy(
    await pulseXFactory.getAddress(),
    await wPLS.getAddress()
  );

  const GambleToken = await ethers.getContractFactory("GambleToken");
  const gambleToken = await GambleToken.deploy(await pulseX.getAddress());

  const LetsGamble = await ethers.getContractFactory("LetsGamble");
  const letsGamble = await LetsGamble.deploy(
    await gambleToken.getAddress(),
    config
  );

  await network.provider.send("evm_setNextBlockTimestamp", [Date.now()]);
  await network.provider.send("evm_mine");

  return { letsGamble, gambleToken, pulseX, origin, receiver };
}

export async function addGames(letsGamble: LetsGamble, now: number) {
  const games = [
    {
      home: "Astralis",
      away: "Faze",
      id: 1234567,
      gameStartTimestamp: getRandomFuture(now),
      gameEndTimestamp: getRandomFuture(now) + 1000,
      status: 0,
    },
    {
      home: "NinjasInPyjamas",
      away: "Fanatic",
      id: 4567890,
      gameStartTimestamp: getRandomFuture(now),
      gameEndTimestamp: getRandomFuture(now) + 1000,
      status: 0,
    },
    {
      home: "Spirit",
      away: "Ence",
      id: 2345678,
      gameStartTimestamp: getRandomFuture(now),
      gameEndTimestamp: getFuture(now) + 1000,
      status: 0,
    },
    {
      home: "Cloud9",
      away: "Navi",
      id: 3456789,
      gameStartTimestamp: getRandomFuture(now),
      gameEndTimestamp: getRandomFuture(now) + 1000,
      status: 0,
    },
    {
      home: "G2",
      away: "VirtusPro",
      id: 4567890,
      gameStartTimestamp: getRandomFuture(now),
      gameEndTimestamp: getRandomFuture(now) + 1000,
      status: 0,
    },
  ].map((game): Promise<TransactionResponse> => {
    return letsGamble.addGame(game);
  });
  await Promise.all(games);
  return games.length;
}

export const getGambleContract = async (contract: string) => {
  return await ethers.getContractAt("GambleContract", contract);
};

export const getPool = async (contract: string) => {
  return await ethers.getContractAt("WagerPool", contract);
};
