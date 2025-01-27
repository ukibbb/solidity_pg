// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ResultsConsumer} from "../ResultsConsumer.sol";

contract MockResultsConsumer is ResultsConsumer {
    constructor(
        address oracle,
        bytes32 donId,
        uint64 subscriptionId,
        string memory source,
        bytes memory secrets
    ) ResultsConsumer(oracle, donId, subscriptionId, source, secrets) {}

    function requestResult(
        uint256 gameId
    ) external returns (bytes32 requestId) {
        requestId = _requestResult(gameId);
    }

    event ResultProcessed(uint256 gameId, bytes response);

    function _processResult(
        uint256 gameId,
        bytes memory response
    ) internal override {
        emit ResultProcessed(gameId, response);
    }
}
