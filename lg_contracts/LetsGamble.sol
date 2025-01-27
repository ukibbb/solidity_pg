// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./GambleContract.sol";
import "./GambleToken.sol";
import {CommonData} from "./CommonData.sol";
// import "./pulseX/interfaces/IPulseXFactory.sol";
import "hardhat/console.sol";

error LetsGamble__WrongGamePayload(string message);
error LetsGamble__WrongStatus(string message);
error LetsGamble__NotInFuture(string message);
error LetsGamble__StartAfterFinish(string message);

contract LetsGamble is CommonData {
    GambleToken private i_GAMBLE;
    Config private i_config;
    // TODO mapping GAME RESOLVE DELEY for supported games

    mapping(uint256 => LetsGambleGame) public s_activeGames;
    mapping(uint256 => LetsGambleGame) s_resolvedGames;
    mapping(uint256 => LetsGambleGame) s_gamesPlayed;
    uint256 s_gamesCount;

    LetsGambleGame public s_lastPlayed;

    event GameCreated(
        LetsGambleGame indexed letsGamble,
        address indexed createor
    );

    constructor(address _GAMBLE, Config memory config) {
        i_GAMBLE = GambleToken(_GAMBLE);
        i_config = config;
    }

    /// Functions which starts gamble on a game
    function addGame(Game memory _game) public {
        if (_game.status != GameStatus.Created)
            // status is not created.
            revert LetsGamble__WrongStatus("Status has to be Created.");

        if (_game.gameStartTimestamp < block.timestamp)
            // if game start is after block timestamp.
            revert LetsGamble__NotInFuture("Game has to be in the future");

        if (_game.gameStartTimestamp > _game.gameEndTimestamp)
            revert LetsGamble__StartAfterFinish(
                "You can't finish before start."
            );

        // Revert if id exists.
        //if LetsGambleLibrary.isUnique(_game.id, s_gamesPlayed) {

        //}

        // Creating a game.
        Game memory i_game = Game(
            _game.home,
            _game.away,
            _game.gameStartTimestamp,
            _game.gameEndTimestamp,
            _game.id,
            GameStatus.Created
        );
        // Creating contract for the game
        GambleContract i_gameContract = new GambleContract(
            i_game,
            i_config,
            i_GAMBLE,
            address(this)
        );
        LetsGambleGame memory i_letsGambleGame = LetsGambleGame(
            i_game,
            address(i_gameContract)
        );
        // last played.
        s_lastPlayed = i_letsGambleGame;
        // list of games played.
        s_gamesPlayed[i_game.id] = i_letsGambleGame;
        s_activeGames[i_game.id] = i_letsGambleGame;
        s_gamesCount += 1;

        emit GameCreated(i_letsGambleGame, msg.sender);
    }

    function getGamesCount() public view returns (uint256) {
        return s_gamesCount;
    }

    function getLastGame() public view returns (LetsGambleGame memory) {
        return s_lastPlayed;
    }

    // change on frontend.
    function getAllGames() public view returns (LetsGambleGame[] memory) {
        //    return s_gamesPlayed;
    }

    function getLatestGame() public view returns (LetsGambleGame memory) {
        // LetsGambleGame memory latest;
        // for (uint i = 0; i < s_gamesPlayed.length; i++) {
        //     if (latest.gambleContract == address(0)) {
        //         latest = s_gamesPlayed[i];
        //         continue;
        //     }
        //     uint _gameTimestamp = s_gamesPlayed[i].game.timestamp;
        //     if (_gameTimestamp > latest.game.timestamp) {
        //         latest = s_gamesPlayed[i];
        //     }
        // }
        // return latest;
    }
}
