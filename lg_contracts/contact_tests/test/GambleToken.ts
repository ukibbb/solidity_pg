import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import hre from "hardhat";
import { deployLetsGamble } from "./functions";
import { toBigInt } from "ethers";
import { GambleToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("GambleToken", () => {
  describe("Init", () => {
    let supply: BigInt;
    let _gamble: GambleToken;
    let _origin: HardhatEthersSigner;
    let _receiver: HardhatEthersSigner;
    before(async () => {
      supply = toBigInt("25000000000000000000000000000000");
      const { gambleToken, origin, receiver } = await loadFixture(
        deployLetsGamble
      );
      _gamble = gambleToken;
      _origin = origin;
      _receiver = receiver;
    });
    it("should deploy token with initialSupply 25T", async function () {
      const totalSupply = await _gamble.totalSupply();
      assert.equal(totalSupply, supply);
    });

    it("should owner had full supply", async () => {
      expect(await _gamble.balanceOf(_origin.address)).to.equal(supply);
    });
    it("send gamble token", async () => {
      await _gamble.approve(
        _origin.address,
        await _gamble.balanceOf(_origin.address)
      );
      await _gamble.transferFrom(
        _origin.address,
        _receiver.address,
        toBigInt("1000000")
      );
      console.log(await _gamble.balanceOf(_origin.address));
      console.log(await _gamble.balanceOf(_receiver.address));
    });
  });
});
