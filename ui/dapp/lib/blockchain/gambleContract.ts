export const gambleContractAbi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "home",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "away",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "enum Common.GameStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct Common.Game",
        "name": "_game",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "gamblerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "wagerAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Common.Gambler",
        "name": "gambler",
        "type": "tuple"
      }
    ],
    "name": "gambleOnAway",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "gamblerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "wagerAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Common.Gambler",
        "name": "gambler",
        "type": "tuple"
      }
    ],
    "name": "gambleOnHome",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAwayGamblers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "gamblerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "wagerAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Common.Gambler[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAwayPoolAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAwayPoolName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAwayWagerAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAwayWagerPool",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGameGamblers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "gamblerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "wagerAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Common.Gambler[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGameInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "home",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "away",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "enum Common.GameStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct Common.Game",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGameStatus",
    "outputs": [
      {
        "internalType": "enum Common.GameStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHomeGamblers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "gamblerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "wagerAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Common.Gambler[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHomePoolAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHomePoolName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHomeWagerAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHomeWagerPool",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalGameWagerAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resolveGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
