 * The following statements are considered modifing the state.
 * - emitting events.
 * - creating other contracts
 * - using selfdestruct
 * - sending Ether via calls.
 * - calling any function not marked view or pure
 * - using low-level calls
 * - using inlline assembly that contains certain opcodes.
 */
uint private privateVar;   // only accessible within this contract
uint internal internalVar; // accessible within this contract and derived ones
uint public publicVar;     // accessible everywhere
```solidity
     function privateFunction() private view {
            // code
        }

        function internalFunction() internal view {
            // code
        }

        function publicFunction() public view {
            // code
        }

        function externalFunction() external view {
            // code
        }
```
// Visibility specifiers
// `public`
//  - `for functions` - they can be called internally, by derived contracts, and externally via transactions.
//                      public function is part of the contract interface and can be invoked by other contracts.
//                      and transactions
//  - `for state variables` - automaticaly generates getter function allowing the variable to be read
//                              form outside the contract. This does noot mean the variable can be written from outside;
//                                it's value can only be changed from within the contract or derived contracts (depending on other access control)
// private
//  - `for functions and state variables` - Can only be accessed internally, meaning only from within a contract
//                                          they are defined in. Even derived contracts cannot acccess private functions and variables.
//                                              this is the most restrictive visibility and is usefull when you want to limit access strictly to the contract
//                                                  where members are defined.
// `internal`
//  - for `functions and state variables` - Are accessible form the contract they are defined in and any derived contracts. It's less restrictive then `private`
//                                          but still not accessible externally. Internal functions and variables are ofter used when you want to allow access
//                                              to derived contracts while keeping the member inaccessible to other external callers.
// external
//  - `for functions only`  - Are desinged to be called only from outside the contract. This means they cannot be called from other functions within the same contract.
//                             Even by `this.functionName()`. However they can be called from other contracts and transactions. An intresting point about `external`
//                              functions is that they can accept data types in `calldata` which can save gas compared to `memory` for temporary variables.
//                              This is because `calldata` is a special data location that contains the function arguments, only available to `external` functions

// DATA LOCATION (arrays and structs)
// `memory, storage, calldata`
// `memory` -- data will be stored only during execution of a function.
// `calldata` -- similar to memory but it's only available for external functions.
// It's no-nodifable, non-persistent area where function arguments are stored. behaves mostly like memory
```solidity
function functionName(parameters) visibility returns (returnType) {
 Function body
}
```
// Function modifiers
// `pure` -- indicates that the function does not read from or modify state.
// `view`  -- does not modify state but can read from it.
// `payable` -- allows function to receive ether.

// `contstant` - for variables never change. hard-coded and cost less gas
// `imutable` - similar to constant, but can be set within the constructor.
// Useful for configuration that will not change.




// require, revert and assert for error handling and input validation provided by solidity.

 //     The assert() function is used to
        // test for internal errors and to check invariants.
        // It uses up all remaining gas when failing,
        // so it’s generally used to prevent conditions that should
        // never be possible.

        // require() is most commonly used for input validation,
        // while assert() is typically reserved for checking
        // for errors that are not supposed to occur, indicating
        // a more serious issue. Custom errors provide a
        // cleaner and more gas-efficient way to handle errors as
        // of Solidity 0.8.x.

Modifiers in Solidity are used to change the behavior of functions in a declarative way. They are typically used to add preconditions to functions or to encapsulate common requirements into a reusable code unit.

Modifiers can check conditions prior to executing the function, or they can alter inputs and outputs. They can even wrap the function code for additional logic before and after the function execution.

```solidity
pragma solidity ^0.8.0;

contract Owned {
    address public owner;

    constructor() {
        owner = msg.sender; // Set the contract creator as owner
    }

    // Modifier to check that the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _; // The underscore represents the body of the function that is using this modifier
    }

    // Function that can only be called by the owner
    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
```

Unchecked
The unchecked keyword in Solidity is used to disable overflow checks for arithmetic operations. By default, Solidity automatically checks for arithmetic overflows and underflows which can significantly increase gas costs. When you are certain that overflows cannot occur, using unchecked can save gas.

```solidity
pragma solidity ^0.8.0;

contract UncheckedExample {
    function sum(uint256 a, uint256 b) public pure returns (uint256) {
        unchecked {
            return a + b; // No overflow checks are performed for this addition
        }
    }
}
```

