// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./pulseX/interfaces/IPulseXRouter02.sol";

contract GambleToken is ERC20 {
    uint256 private i_initialSupply = 25000000000000 * 10 ** 18;
    IPulseXRouter02 public pulseX;

    constructor(address _pulseX) ERC20("Gamble", "GAMBLE") {
        _mint(msg.sender, i_initialSupply);
        pulseX = IPulseXRouter02(_pulseX);
    }
}
