import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import { before } from "mocha";
import { GambleToken, LetsGamble } from "../typechain-types";
import {
  addGames,
  deployLetsGamble,
  getGambleContract,
  getPool,
} from "./functions";
import {} from "./functions";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("GambleContract", () => {
  let now: number;
  let _letsGamble: LetsGamble;
  let _gamble: GambleToken;
  let _origin: HardhatEthersSigner;
  let _receiver: HardhatEthersSigner;
  before(async () => {
    now = Date.now();
    const { letsGamble, gambleToken, origin, receiver } = await loadFixture(
      deployLetsGamble
    );
    _letsGamble = letsGamble;
    _gamble = gambleToken;
    _origin = origin;
    _receiver = receiver;
    addGames(_letsGamble, now);
  });
  describe("Init", () => {
    it("should games has proper status ", async () => {
      const games = await _letsGamble.getAllGames();
      for (const game of games) {
        assert.equal(game.game.status, BigInt(0));
      }
    });
    it("should home and away pools are created", async () => {
      const games = await _letsGamble.getAllGames();
      for (const game of games) {
        const gambleContractAddress = game.gambleContract;
        const gambleContract = await getGambleContract(gambleContractAddress);
        const poolA = await gambleContract.getHomePool();
        const poolB = await gambleContract.getAwayPool();
        assert.notEqual(poolA, "0x");
        assert.notEqual(poolB, "0x");
      }
    });
    it("should game info be setup properly", async () => {
      const games = await _letsGamble.getAllGames();
      for (const game of games) {
        const gambleContractAddress = game.gambleContract;
        const gambleContract = await getGambleContract(gambleContractAddress);
        assert.deepEqual(await gambleContract.getGameInfo(), game.game);
      }
    });
    it("should total wager amout to be 0", async () => {
      const games = await _letsGamble.getAllGames();
      for (const game of games) {
        const gambleContractAddress = game.gambleContract;
        const gambleContract = await getGambleContract(gambleContractAddress);
        assert.equal(
          await gambleContract.getTotalGameWagerAmount(),
          ethers.toBigInt("0")
        );
      }
    });
    it("should not be game gamblers", async () => {
      const games = await _letsGamble.getAllGames();
      for (const game of games) {
        const gambleContractAddress = game.gambleContract;
        const gambleContract = await getGambleContract(gambleContractAddress);
        assert.equal((await gambleContract.getHomeGamblers()).length, 0);
        assert.equal((await gambleContract.getAwayGamblers()).length, 0);
      }
    });
  });
  describe("Betting", () => {
    it("should revert if we are not sending gamble", async () => {
      const game = await _letsGamble.getLastGame();
      const gambleContract = await getGambleContract(game.gambleContract);
      const homeWagerPool = await gambleContract.getHomePool();
      const awayWagerPool = await gambleContract.getAwayPool();
      const homePool = await getPool(homeWagerPool);
      const awayPool = await getPool(awayWagerPool);
      await _gamble.approve(homePool, BigInt("10000000000000000"));
      await homePool.deposit(BigInt("1000000"));
      console.log(await homePool.s_wagerPoolAmount());
      console.log(await homePool.s_gamblers(_origin.address));
    });
  });
});
