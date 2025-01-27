// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IWPLS.sol";
import "./interfaces/IPulseXFactory.sol";
import "./libraries/SafeMath.sol";
import "./libraries/PulseXLibrary.sol";
import "./libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PulseXRouter02 {
    using SafeMath for uint;

    address public immutable factory;
    address public immutable WPLS;

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, "PulseXRouter: EXPIRED");
        _;
    }

    constructor(address _factory, address _WPLS) {
        factory = _factory;
        WPLS = _WPLS;
    }

    receive() external payable {
        assert(msg.sender == WPLS); // only accept PLS via fallback from the WPLS contract
    }

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {
        // create the pair if it doesn't exist yet
        if (IPulseXFactory(factory).getPair(tokenA, tokenB) == address(0)) {
            IPulseXFactory(factory).createPair(tokenA, tokenB);
        }
        // check how much is resever in pulseX of token a and b
        (uint reserveA, uint reserveB) = PulseXLibrary.getReserves(
            factory,
            tokenA,
            tokenB
        );
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = PulseXLibrary.quote(
                amountADesired,
                reserveA,
                reserveB
            );
            if (amountBOptimal <= amountBDesired) {
                require(
                    amountBOptimal >= amountBMin,
                    "PulseXRouter: INSUFFICIENT_B_AMOUNT"
                );
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = PulseXLibrary.quote(
                    amountBDesired,
                    reserveB,
                    reserveA
                );
                assert(amountAOptimal <= amountADesired);
                require(
                    amountAOptimal >= amountAMin,
                    "PulseXRouter: INSUFFICIENT_A_AMOUNT"
                );
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        external
        virtual
        ensure(deadline)
        returns (uint amountA, uint amountB, uint liquidity)
    {
        (amountA, amountB) = _addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );
        address pair = PulseXLibrary.pairFor(factory, tokenA, tokenB);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = IPulseXPair(pair).mint(to, msg.sender);
    }

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        external
        payable
        virtual
        ensure(deadline)
        returns (uint amountToken, uint amountETH, uint liquidity)
    {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WPLS,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = PulseXLibrary.pairFor(factory, token, WPLS);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWPLS(WPLS).deposit{value: amountETH}();
        assert(IWPLS(WPLS).transfer(pair, amountETH));
        liquidity = IPulseXPair(pair).mint(to, msg.sender);
        // refund dust eth, if any
        if (msg.value > amountETH)
            TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }

    // // **** REMOVE LIQUIDITY ****
    // function removeLiquidity(
    //     address tokenA,
    //     address tokenB,
    //     uint liquidity,
    //     uint amountAMin,
    //     uint amountBMin,
    //     address to,
    //     uint deadline
    // ) public virtual ensure(deadline) returns (uint amountA, uint amountB) {
    //     address pair = PulseXLibrary.pairFor(factory, tokenA, tokenB);
    //     IPulseXPair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
    //     (uint amount0, uint amount1) = IPulseXPair(pair).burn(to, msg.sender);
    //     (address token0, ) = PulseXLibrary.sortTokens(tokenA, tokenB);
    //     (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
    //     require(amountA >= amountAMin, "PulseXRouter: INSUFFICIENT_A_AMOUNT");
    //     require(amountB >= amountBMin, "PulseXRouter: INSUFFICIENT_B_AMOUNT");
    // }

    // function removeLiquidityETH(
    //     address token,
    //     uint liquidity,
    //     uint amountTokenMin,
    //     uint amountETHMin,
    //     address to,
    //     uint deadline
    // ) public virtual ensure(deadline) returns (uint amountToken, uint amountETH) {
    //     (amountToken, amountETH) = removeLiquidity(
    //         token,
    //         WPLS,
    //         liquidity,
    //         amountTokenMin,
    //         amountETHMin,
    //         address(this),
    //         deadline
    //     );
    //     TransferHelper.safeTransfer(token, to, amountToken);
    //     IWPLS(WPLS).withdraw(amountETH);
    //     TransferHelper.safeTransferETH(to, amountETH);
    // }

    // function removeLiquidityWithPermit(
    //     address tokenA,
    //     address tokenB,
    //     uint liquidity,
    //     uint amountAMin,
    //     uint amountBMin,
    //     address to,
    //     uint deadline,
    //     bool approveMax,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) external virtual returns (uint amountA, uint amountB) {
    //     address pair = PulseXLibrary.pairFor(factory, tokenA, tokenB);
    //     uint value = approveMax ? type(uint).max : liquidity;
    //     IPulseXPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
    //     (amountA, amountB) = removeLiquidity(
    //         tokenA,
    //         tokenB,
    //         liquidity,
    //         amountAMin,
    //         amountBMin,
    //         to,
    //         deadline
    //     );
    // }

    // function removeLiquidityETHWithPermit(
    //     address token,
    //     uint liquidity,
    //     uint amountTokenMin,
    //     uint amountETHMin,
    //     address to,
    //     uint deadline,
    //     bool approveMax,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) external virtual returns (uint amountToken, uint amountETH) {
    //     address pair = PulseXLibrary.pairFor(factory, token, WPLS);
    //     uint value = approveMax ? type(uint).max : liquidity;
    //     IPulseXPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
    //     (amountToken, amountETH) = removeLiquidityETH(
    //         token,
    //         liquidity,
    //         amountTokenMin,
    //         amountETHMin,
    //         to,
    //         deadline
    //     );
    // }

    // // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    // function removeLiquidityETHSupportingFeeOnTransferTokens(
    //     address token,
    //     uint liquidity,
    //     uint amountTokenMin,
    //     uint amountETHMin,
    //     address to,
    //     uint deadline
    // ) public virtual ensure(deadline) returns (uint amountETH) {
    //     (, amountETH) = removeLiquidity(
    //         token,
    //         WPLS,
    //         liquidity,
    //         amountTokenMin,
    //         amountETHMin,
    //         address(this),
    //         deadline
    //     );
    //     TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
    //     IWPLS(WPLS).withdraw(amountETH);
    //     TransferHelper.safeTransferETH(to, amountETH);
    // }

    // function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    //     address token,
    //     uint liquidity,
    //     uint amountTokenMin,
    //     uint amountETHMin,
    //     address to,
    //     uint deadline,
    //     bool approveMax,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) external virtual returns (uint amountETH) {
    //     address pair = PulseXLibrary.pairFor(factory, token, WPLS);
    //     uint value = approveMax ? type(uint).max : liquidity;
    //     IPulseXPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
    //     amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
    //         token,
    //         liquidity,
    //         amountTokenMin,
    //         amountETHMin,
    //         to,
    //         deadline
    //     );
    // }

    // // **** SWAP ****
    // // requires the initial amount to have already been sent to the first pair
    // function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
    //     for (uint i; i < path.length - 1; i++) {
    //         (address input, address output) = (path[i], path[i + 1]);
    //         (address token0, ) = PulseXLibrary.sortTokens(input, output);
    //         uint amountOut = amounts[i + 1];
    //         (uint amount0Out, uint amount1Out) = input == token0
    //             ? (uint(0), amountOut)
    //             : (amountOut, uint(0));
    //         address to = i < path.length - 2
    //             ? PulseXLibrary.pairFor(factory, output, path[i + 2])
    //             : _to;
    //         IPulseXPair(PulseXLibrary.pairFor(factory, input, output)).swap(
    //             amount0Out,
    //             amount1Out,
    //             to,
    //             new bytes(0)
    //         );
    //     }
    // }

    // function swapExactTokensForTokens(
    //     uint amountIn,
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external virtual ensure(deadline) returns (uint[] memory amounts) {
    //     amounts = PulseXLibrary.getAmountsOut(factory, amountIn, path);
    //     require(
    //         amounts[amounts.length - 1] >= amountOutMin,
    //         "PulseXRouter: INSUFFICIENT_OUTPUT_AMOUNT"
    //     );
    //     TransferHelper.safeTransferFrom(
    //         path[0],
    //         msg.sender,
    //         PulseXLibrary.pairFor(factory, path[0], path[1]),
    //         amounts[0]
    //     );
    //     _swap(amounts, path, to);
    // }

    // function swapTokensForExactTokens(
    //     uint amountOut,
    //     uint amountInMax,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external virtual ensure(deadline) returns (uint[] memory amounts) {
    //     amounts = PulseXLibrary.getAmountsIn(factory, amountOut, path);
    //     require(amounts[0] <= amountInMax, "PulseXRouter: EXCESSIVE_INPUT_AMOUNT");
    //     TransferHelper.safeTransferFrom(
    //         path[0],
    //         msg.sender,
    //         PulseXLibrary.pairFor(factory, path[0], path[1]),
    //         amounts[0]
    //     );
    //     _swap(amounts, path, to);
    // }

    // function swapExactETHForTokens(
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external payable virtual ensure(deadline) returns (uint[] memory amounts) {
    //     require(path[0] == WPLS, "PulseXRouter: INVALID_PATH");
    //     amounts = PulseXLibrary.getAmountsOut(factory, msg.value, path);
    //     require(
    //         amounts[amounts.length - 1] >= amountOutMin,
    //         "PulseXRouter: INSUFFICIENT_OUTPUT_AMOUNT"
    //     );
    //     IWPLS(WPLS).deposit{value: amounts[0]}();
    //     assert(IWPLS(WPLS).transfer(PulseXLibrary.pairFor(factory, path[0], path[1]), amounts[0]));
    //     _swap(amounts, path, to);
    // }

    // function swapTokensForExactETH(
    //     uint amountOut,
    //     uint amountInMax,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external virtual ensure(deadline) returns (uint[] memory amounts) {
    //     require(path[path.length - 1] == WPLS, "PulseXRouter: INVALID_PATH");
    //     amounts = PulseXLibrary.getAmountsIn(factory, amountOut, path);
    //     require(amounts[0] <= amountInMax, "PulseXRouter: EXCESSIVE_INPUT_AMOUNT");
    //     TransferHelper.safeTransferFrom(
    //         path[0],
    //         msg.sender,
    //         PulseXLibrary.pairFor(factory, path[0], path[1]),
    //         amounts[0]
    //     );
    //     _swap(amounts, path, address(this));
    //     IWPLS(WPLS).withdraw(amounts[amounts.length - 1]);
    //     TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    // }

    // function swapExactTokensForETH(
    //     uint amountIn,
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external virtual ensure(deadline) returns (uint[] memory amounts) {
    //     require(path[path.length - 1] == WPLS, "PulseXRouter: INVALID_PATH");
    //     amounts = PulseXLibrary.getAmountsOut(factory, amountIn, path);
    //     require(
    //         amounts[amounts.length - 1] >= amountOutMin,
    //         "PulseXRouter: INSUFFICIENT_OUTPUT_AMOUNT"
    //     );
    //     TransferHelper.safeTransferFrom(
    //         path[0],
    //         msg.sender,
    //         PulseXLibrary.pairFor(factory, path[0], path[1]),
    //         amounts[0]
    //     );
    //     _swap(amounts, path, address(this));
    //     IWPLS(WPLS).withdraw(amounts[amounts.length - 1]);
    //     TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    // }

    // function swapETHForExactTokens(
    //     uint amountOut,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external payable virtual ensure(deadline) returns (uint[] memory amounts) {
    //     require(path[0] == WPLS, "PulseXRouter: INVALID_PATH");
    //     amounts = PulseXLibrary.getAmountsIn(factory, amountOut, path);
    //     require(amounts[0] <= msg.value, "PulseXRouter: EXCESSIVE_INPUT_AMOUNT");
    //     IWPLS(WPLS).deposit{value: amounts[0]}();
    //     assert(IWPLS(WPLS).transfer(PulseXLibrary.pairFor(factory, path[0], path[1]), amounts[0]));
    //     _swap(amounts, path, to);
    //     // refund dust eth, if any
    //     if (msg.value > amounts[0])
    //         TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    // }

    // // **** SWAP (supporting fee-on-transfer tokens) ****
    // // requires the initial amount to have already been sent to the first pair
    // function _swapSupportingFeeOnTransferTokens(
    //     address[] memory path,
    //     address _to
    // ) internal virtual {
    //     for (uint i; i < path.length - 1; i++) {
    //         (address input, address output) = (path[i], path[i + 1]);
    //         (address token0, ) = PulseXLibrary.sortTokens(input, output);
    //         IPulseXPair pair = IPulseXPair(PulseXLibrary.pairFor(factory, input, output));
    //         uint amountInput;
    //         uint amountOutput;
    //         {
    //             // scope to avoid stack too deep errors
    //             (uint reserve0, uint reserve1, ) = pair.getReserves();
    //             (uint reserveInput, uint reserveOutput) = input == token0
    //                 ? (reserve0, reserve1)
    //                 : (reserve1, reserve0);
    //             amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
    //             amountOutput = PulseXLibrary.getAmountOut(amountInput, reserveInput, reserveOutput);
    //         }
    //         (uint amount0Out, uint amount1Out) = input == token0
    //             ? (uint(0), amountOutput)
    //             : (amountOutput, uint(0));
    //         address to = i < path.length - 2
    //             ? PulseXLibrary.pairFor(factory, output, path[i + 2])
    //             : _to;
    //         pair.swap(amount0Out, amount1Out, to, new bytes(0));
    //     }
    // }

    // function swapExactTokensForTokensSupportingFeeOnTransferTokens(
    //     uint amountIn,
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external virtual ensure(deadline) {
    //     TransferHelper.safeTransferFrom(
    //         path[0],
    //         msg.sender,
    //         PulseXLibrary.pairFor(factory, path[0], path[1]),
    //         amountIn
    //     );
    //     uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
    //     _swapSupportingFeeOnTransferTokens(path, to);
    //     require(
    //         IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
    //         "PulseXRouter: INSUFFICIENT_OUTPUT_AMOUNT"
    //     );
    // }

    // function swapExactETHForTokensSupportingFeeOnTransferTokens(
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external payable virtual ensure(deadline) {
    //     require(path[0] == WPLS, "PulseXRouter: INVALID_PATH");
    //     uint amountIn = msg.value;
    //     IWPLS(WPLS).deposit{value: amountIn}();
    //     assert(IWPLS(WPLS).transfer(PulseXLibrary.pairFor(factory, path[0], path[1]), amountIn));
    //     uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
    //     _swapSupportingFeeOnTransferTokens(path, to);
    //     require(
    //         IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
    //         "PulseXRouter: INSUFFICIENT_OUTPUT_AMOUNT"
    //     );
    // }

    // function swapExactTokensForETHSupportingFeeOnTransferTokens(
    //     uint amountIn,
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external virtual ensure(deadline) {
    //     require(path[path.length - 1] == WPLS, "PulseXRouter: INVALID_PATH");
    //     TransferHelper.safeTransferFrom(
    //         path[0],
    //         msg.sender,
    //         PulseXLibrary.pairFor(factory, path[0], path[1]),
    //         amountIn
    //     );
    //     _swapSupportingFeeOnTransferTokens(path, address(this));
    //     uint amountOut = IERC20(WPLS).balanceOf(address(this));
    //     require(amountOut >= amountOutMin, "PulseXRouter: INSUFFICIENT_OUTPUT_AMOUNT");
    //     IWPLS(WPLS).withdraw(amountOut);
    //     TransferHelper.safeTransferETH(to, amountOut);
    // }

    // // **** LIBRARY FUNCTIONS ****
    // function quote(
    //     uint amountA,
    //     uint reserveA,
    //     uint reserveB
    // ) public pure virtual returns (uint amountB) {
    //     return PulseXLibrary.quote(amountA, reserveA, reserveB);
    // }

    // function getAmountOut(
    //     uint amountIn,
    //     uint reserveIn,
    //     uint reserveOut
    // ) public pure virtual returns (uint amountOut) {
    //     return PulseXLibrary.getAmountOut(amountIn, reserveIn, reserveOut);
    // }

    // function getAmountIn(
    //     uint amountOut,
    //     uint reserveIn,
    //     uint reserveOut
    // ) public pure virtual returns (uint amountIn) {
    //     return PulseXLibrary.getAmountIn(amountOut, reserveIn, reserveOut);
    // }

    // function getAmountsOut(
    //     uint amountIn,
    //     address[] memory path
    // ) public view virtual returns (uint[] memory amounts) {
    //     return PulseXLibrary.getAmountsOut(factory, amountIn, path);
    // }

    // function getAmountsIn(
    //     uint amountOut,
    //     address[] memory path
    // ) public view virtual returns (uint[] memory amounts) {
    //     return PulseXLibrary.getAmountsIn(factory, amountOut, path);
    // }
}
