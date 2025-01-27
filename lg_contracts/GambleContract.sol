// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ccip/NativeTokenSender.sol";
import "./ResultsConsumer.sol";
import "./WagerPool.sol";
import "./GambleToken.sol";
import "./LetsGamble.sol";
import "./CommonData.sol";

contract GambleContract is ResultsConsumer, NativeTokenSender, CommonData {
    Game internal i_game;
    GambleToken private i_GAMBLE;
    Config private i_config;
    LetsGamble private i_letsGamble;

    WagerPool internal s_homePool;
    WagerPool internal s_awayPool;

    // mapping(address => uint256) s_gamblers;
    // mapping(address => uint256) s_homeGamblers;
    // mapping(address => uint256) s_awayGamblers;
    /// @notice Mapping of game IDs to Chainlink Functions request IDs
    mapping(uint256 => bytes32) private pendingRequests;

    error GambleContract__GambleContractAddressNotMatch();
    error GambleContract__GambleContractAddressIsZero();
    error GambleContract__GameIsPending();
    error GambleContract__GameHasToWaitForResult();
    error GambleContract__GameIsAlreadyResolved();

    modifier mustBeWinner() {
        // gambler is when msg.sender is in a list of
        // addressed placed bets.
        // We can have losers and winners
        // // The underscore represents the body of the function that is using this modifier
        _;
    }

    constructor(
        Game memory _game,
        Config memory _config,
        GambleToken _GAMBLE,
        address _letsGamble
    )
        ResultsConsumer(
            i_config.oracle,
            i_config.donId,
            i_config.subscriptionId,
            i_config.source,
            i_config.secrets
        )
        NativeTokenSender(
            i_config.ccipRouter,
            i_config.link,
            i_config.weth9Token,
            i_config.exchangeToken,
            i_config.uniswapV3Router,
            i_config.destinationChainSelector
        )
    {
        i_letsGamble = LetsGamble(_letsGamble);
        i_game = _game;
        i_GAMBLE = _GAMBLE;
        i_config = _config;

        // deploying to pools.
        s_homePool = new WagerPool(i_GAMBLE, i_game);
        s_awayPool = new WagerPool(i_GAMBLE, i_game);
    }

    function getGameStatus() public view returns (GameStatus) {
        return i_game.status;
    }

    function getGameInfo() public view returns (Game memory) {
        return i_game;
    }

    function getTotalGameWagerAmount() public view returns (uint256) {
        return s_homePool.s_wagerPoolAmount() + s_awayPool.s_wagerPoolAmount();
    }

    function getHomePoolAmount() public view returns (uint256) {
        return s_homePool.s_wagerPoolAmount();
    }

    function getAwayPoolAmount() public view returns (uint256) {
        return s_awayPool.s_wagerPoolAmount();
    }

    function getHomePool() public view returns (address) {
        return address(s_homePool);
    }

    function getAwayPool() public view returns (address) {
        return address(s_awayPool);
    }

    function getHomeGamblers() public view returns (address[] memory) {
        return s_homePool.getGamblersAddresses();
    }

    function getAwayGamblers() public view returns (address[] memory) {
        return s_awayPool.getGamblersAddresses();
    }

    /// @param response The result of the game
    /// @dev Called back by the ResultsConsumer contract when the result is received
    function _processResult(
        uint256 gameId,
        bytes memory response
    ) internal override {
        Result result = Result(uint256(bytes32(response)));
        // _resolveGame(gameId, result);
    }

    function resolve(uint256 gameId) public {
        (Game memory game, address gambleContract) = i_letsGamble.s_activeGames(
            gameId
        );
        if (gambleContract == address(0))
            revert GambleContract__GambleContractAddressIsZero();
        if (gambleContract != address(this))
            revert GambleContract__GambleContractAddressNotMatch();
        if (game.status == GameStatus.Resolved)
            revert GambleContract__GameIsAlreadyResolved();
        if (game.status != GameStatus.WaitingForResults)
            revert GambleContract__GameHasToWaitForResult();
        if (block.timestamp < game.gameEndTimestamp)
            revert GambleContract__GameIsPending(); // add two hours.

        pendingRequests[game.id] = _requestResult(game.id);
    }
}
