// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.26;

// This will only compile via IR
contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter; // 160-bit value == function minter() external view returns (address) { return minter; }
    mapping(address => uint) public balances; // == function balances(address account) external view returns (uint) { return balances[account]; }

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
        // tx.
        // block.  // special global variables
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }

    // Errors allow you to provide information about
    // why an operation failed. They are returned
    // to the caller of the function.
    error InsufficientBalance(uint requested, uint available);

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(
            amount <= balances[msg.sender],
            InsufficientBalance(amount, balances[msg.sender])
        );
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}

// The Ethereum Virtual Machine has different areas where it can store data with the most prominent
// being:
// storage
// is persistent between function calls and transactions.
// Storage is a key-value store that maps 256-bit words to 256-bit words. I
// t is not possible to enumerate storage from within a contract,
// it is comparatively costly to read,
// and even more to initialise and modify storage.
// Because of this cost, you should minimize what you store
// in persistent storage to what the contract needs to run.
// Store data like derived calculations, caching, and aggregates outside of the contract.
// A contract can neither read nor write to any storage apart from its own.

// transient storage,
// Similar to storage, there is another data area called transient storage,
// where the main difference is that it is reset at the end of each transaction.
// The values stored in this data location persist only across
// function calls originating from the first call of the transaction.
// When the transaction ends, the transient storage is reset and
// the values stored there become unavailable to calls in subsequent
// transactions. Despite this, the cost of reading and writing to
// transient storage is significantly lower than for storage.

// memory
// contract obtains a freshly cleared instance for each message call.
// Memory is linear and can be addressed at byte level, but reads are limited to a
// width of 256 bits, while writes can be either
// 8 bits or 256 bits wide. Memory is expanded by a word (256-bit),
// when accessing (either reading or writing) a
// previously untouched memory word (i.e. any offset within a word).
// At the time of expansion, the cost in gas must be paid.
// Memory is more costly the larger it grows (it scales quadratically).

// stack.
// The EVM is not a register machine but a stack machine,
// so all computations are performed on a data area called the stack.
// It has a maximum size of 1024 elements and contains words of 256 bits.
// Access to the stack is limited to the top end in the following way:
// It is possible to copy one of the topmost 16 elements to
// the top of the stack or swap the topmost element with one of the 16 elements below it.
// All other operations take the topmost two (or one, or more, depending on the operation)
// elements from the stack and push the result onto the stack.
// Of course it is possible to move stack elements to storage
// or memory in order to get deeper access to the stack,
// but it is not possible to just access arbitrary elements
// deeper in the stack without first removing the top of the stack.

// The calldata region is the data sent to a transaction as part of a
// smart contract transaction. For example, when creating a contract,
// calldata would be the constructor code of the new contract.
// The parameters of external functions are always initially stored
// in calldata in an ABI-encoded form and only then decoded into
// the location specified in their declaration. If declared as memory,
// the compiler will eagerly decode them into memory at the beginning of
// the function, while marking them as calldata means that this will be done lazily,
// only when accessed. Value types and storage pointers are decoded directly onto the stack.

// The returndata is the way a smart contract can return a value after a call.
// In general, external Solidity functions use the
// return keyword to ABI-encode values into the returndata area.

// The code is the region where the EVM instructions of a smart
// contract are stored. Code is the bytes read,
// interpreted, and executed by the EVM during smart contract execution.
// Instruction data stored in the code is persistent as part of
// a contract account state field. Immutable and constant variables are stored in the code region.
// All references to immutables are replaced with the values assigned to them.
// A similar process is performed for constants which have their
// expressions inlined in the places where they are referenced in the smart contract code.
