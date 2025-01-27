// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CommonData {
    struct Config {
        address oracle; // The address of the Chainlink Function oracle
        address ccipRouter; // The address of the Chainlink CCIP router
        address link; // The address of the LINK token
        address weth9Token; // The address of the WETH9 token
        address exchangeToken; // The address of the exchange token used to transfer native tokens
        address uniswapV3Router; // The address of the Uniswap V3 router
        uint64 subscriptionId; // The ID of the Chainlink Functions subscription
        uint64 destinationChainSelector; // The chain selector for the winnings transfer destination chain
        bytes32 donId; // The ID of the Chainlink oracle network
        bytes secrets; // The secrets for the Chainlink Functions request
        string source; // The source code for the Chainlink Functions request
    }
    enum Result {
        ResultHome,
        ResultAway,
        ResultDraw
    }

    enum Side {
        SideHome,
        SideAway
    }

    enum GameStatus {
        Created,
        WaitingForResults,
        Resolved,
        GambleFailed
    }

    struct Gambler {
        address gamblerAddress;
        uint256 wagerAmount;
    }

    struct Game {
        string home;
        string away;
        uint256 gameStartTimestamp;
        uint256 gameEndTimestamp;
        uint256 id;
        GameStatus status;
    }

    struct LetsGambleGame {
        Game game;
        address gambleContract;
    }
}
