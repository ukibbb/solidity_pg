// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./CommonData.sol";
import "./GambleToken.sol";

contract WagerPool is CommonData {
    GambleToken private i_GAMBLE;
    Game private i_game;

    uint256 public s_wagerPoolAmount;
    address[] public s_gamblersAddresses;
    mapping(address => uint256) public s_gamblers;

    event BetPlaced();
    event WithdrawalMade(address sender, uint256 _withdrawAmount);

    error WagerPool__NotSufficientGambleBalance();
    error WagerPool__NotSufficientWagerAmount();

    constructor(GambleToken _GAMBLE, Game memory _game) {
        i_game = _game;
        i_GAMBLE = _GAMBLE;
    }

    function getGamblersAddresses() public view returns (address[] memory) {
        return s_gamblersAddresses;
    }

    function deposit(uint256 _wagerAmount) public {
        if (i_game.status == GameStatus.Created)
            i_game.status = GameStatus.WaitingForResults;

        // What is to do to send GAMBLE from user to this wager Pool
        if (_wagerAmount < 0) revert WagerPool__NotSufficientWagerAmount();

        uint256 balance = i_GAMBLE.balanceOf(msg.sender);

        if (balance < _wagerAmount)
            revert WagerPool__NotSufficientGambleBalance();

        i_GAMBLE.transferFrom(msg.sender, address(this), _wagerAmount);

        unchecked {
            // check also if msg.sender is already a gambler
            s_gamblers[msg.sender] += _wagerAmount;
            s_wagerPoolAmount += _wagerAmount;
        }
        s_gamblersAddresses.push(msg.sender);

        emit BetPlaced();
    }

    function withdraw(address winner) public {
        // check if game is resolved.
        // check if address is in winners
        // do some checks
        // unchecked {
        //     s_wagerPoolAmount -= _withdrawAmount;
        //     s_gamblers[msg.sender] -= _withdrawAmount;
        // }
        // i_GAMBLE.transfer(msg.sender, _withdrawAmount);
        // emit WithdrawalMade(msg.sender, _withdrawAmount);
    }
}
