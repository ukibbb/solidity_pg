import { AddressLike } from "ethers";
export type Game = {
  home: string;
  away: string;
  timestamp: number;
  id: number;
  status?: number;
};

export type GameDefinition = {
  game: Game;
  gambleContract?: AddressLike;
};
