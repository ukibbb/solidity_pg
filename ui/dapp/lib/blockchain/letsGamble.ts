export const letsGambleContractAddress = "0xE2b5bDE7e80f89975f7229d78aD9259b2723d11F"
export const letsGambleContractAbi = [
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
    "name": "LetsGamble__WrongGamePayload",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
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
            "name": "game",
            "type": "tuple"
          },
          {
            "internalType": "contract GambleContract",
            "name": "gambleContract",
            "type": "address"
          }
        ],
        "indexed": false,
        "internalType": "struct LetsGamble.LetsGambleGame",
        "name": "letsGamble",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "createor",
        "type": "address"
      }
    ],
    "name": "GameCreated",
    "type": "event"
  },
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
    "name": "addGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGames",
    "outputs": [
      {
        "components": [
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
            "name": "game",
            "type": "tuple"
          },
          {
            "internalType": "contract GambleContract",
            "name": "gambleContract",
            "type": "address"
          }
        ],
        "internalType": "struct LetsGamble.LetsGambleGame[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGamesCount",
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
    "name": "getLastGame",
    "outputs": [
      {
        "components": [
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
            "name": "game",
            "type": "tuple"
          },
          {
            "internalType": "contract GambleContract",
            "name": "gambleContract",
            "type": "address"
          }
        ],
        "internalType": "struct LetsGamble.LetsGambleGame",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_games",
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
        "name": "game",
        "type": "tuple"
      },
      {
        "internalType": "contract GambleContract",
        "name": "gambleContract",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_lastPlayed",
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
        "name": "game",
        "type": "tuple"
      },
      {
        "internalType": "contract GambleContract",
        "name": "gambleContract",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  ] as const;
