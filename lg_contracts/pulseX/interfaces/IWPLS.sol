// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IWPLS {
    function deposit() external payable;

    function transfer(address to, uint value) external returns (bool);

    function withdraw(uint) external;
}
