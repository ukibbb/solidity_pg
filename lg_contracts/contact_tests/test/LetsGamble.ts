import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { deployLetsGamble } from "./functions";
import { addGames } from "./functions";
import { LetsGamble } from "../typechain-types";
import { getFuture, getPast } from "./functions";

describe("LetsGamble", () => {
  describe("Init", () => {
    let _letsGamble: LetsGamble;
    before(async () => {
      let { letsGamble } = await loadFixture(deployLetsGamble);
      _letsGamble = letsGamble;
    });
    it("should deploy with zero games", async () => {
      const gamesCount = await _letsGamble.getGamesCount();
      assert.equal(gamesCount, BigInt(0), "Games count is equal 0");
    });

    it("should allGames be empty", async () => {
      const games = await _letsGamble.getAllGames();
      assert.lengthOf(games, 0);
    });
    it("Should last game be empty", async () => {
      const lastGame = await _letsGamble.getLastGame();
      assert.equal(
        lastGame.gambleContract,
        "0x0000000000000000000000000000000000000000"
      );
      assert.equal(lastGame.game.home, "");
      assert.equal(lastGame.game.away, "");
      assert.equal(lastGame.game.timestamp, BigInt(0));
      assert.equal(lastGame.game.id, BigInt(0));
    });
  });
  describe("AddGames", () => {
    let _letsGamble: LetsGamble;
    let now: number;
    before(async () => {
      now = Date.now();
      let { letsGamble } = await loadFixture(deployLetsGamble);
      _letsGamble = letsGamble;
    });
    it("should emit GameCreated", async () => {
      await expect(
        _letsGamble.addGame({
          id: 901234567,
          home: "HellRaises",
          away: "FLY",
          timestamp: getFuture(now),
          status: 0,
        })
      ).to.be.emit(_letsGamble, "GameCreated");
    });
    it("should be reverted with wrong status", async () => {
      await expect(
        _letsGamble.addGame({
          home: "FC Barcelona",
          away: "Real Madrit",
          timestamp: getFuture(now),
          id: 34567890,
          status: 2,
        })
      ).to.be.revertedWithCustomError(_letsGamble, "LetsGamble__WrongStatus");
    });
    it("should revert on past date", async () => {
      await expect(
        _letsGamble.addGame({
          home: "AC Milan",
          away: "Juventus Turyn",
          timestamp: getPast(now),
          id: 34567890,
          status: 0,
        })
      ).to.be.revertedWithCustomError(_letsGamble, "LetsGamble__NotInFuture");
    });

    it("should create games successfully.", async () => {
      const games = (await addGames(_letsGamble, now)) + 1;
      console.log("Games", games.toString());
      const gamesCount = await _letsGamble.getGamesCount();
      assert.equal(games.toString(), gamesCount.toString());
    });
  });
});
