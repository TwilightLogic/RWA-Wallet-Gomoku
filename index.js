const { ethers } = require("ethers");

// const provider = new ethers.providers.AlchemyProvider(
//   "goerli",
//   "4r5jiJycaq-CoV8_cLXyJ_uCoyEqRsXP"
// );
// const wallet = new ethers.Wallet(
//   "0x7de86b837c030dd022930e8aa26102140801e370267c39633e9a27a74d0dca6f",
//   provider
// );
// const contractAddress = "0xAC99576AE56bA434168C18983c5541e8A8447A8A";
// const abi = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "roomId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "winner",
//         type: "address",
//       },
//     ],
//     name: "GameEnded",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "roomId",
//         type: "uint256",
//       },
//     ],
//     name: "GameReset",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "roomId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "blackPlayer",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "whitePlayer",
//         type: "address",
//       },
//     ],
//     name: "GameStarted",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "roomId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "enum Gomoku.Position",
//         name: "position",
//         type: "uint8",
//       },
//       { indexed: false, internalType: "uint256", name: "x", type: "uint256" },
//       { indexed: false, internalType: "uint256", name: "y", type: "uint256" },
//     ],
//     name: "MoveMade",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "roomId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "player",
//         type: "address",
//       },
//     ],
//     name: "PlayerLeft",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "roomId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "player",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "enum Gomoku.Position",
//         name: "position",
//         type: "uint8",
//       },
//     ],
//     name: "RoomCreated",
//     type: "event",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "roomId", type: "uint256" },
//       { internalType: "uint256[][]", name: "list", type: "uint256[][]" },
//     ],
//     name: "checkWin",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "enum Gomoku.Position", name: "position", type: "uint8" },
//     ],
//     name: "createRoom",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "roomId", type: "uint256" }],
//     name: "joinRoom",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "roomId", type: "uint256" },
//       { internalType: "uint8", name: "x", type: "uint8" },
//       { internalType: "uint8", name: "y", type: "uint8" },
//     ],
//     name: "makeMove",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "nextRoomId",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "", type: "address" }],
//     name: "players",
//     outputs: [
//       { internalType: "address", name: "addr", type: "address" },
//       { internalType: "uint16", name: "wins", type: "uint16" },
//       { internalType: "uint16", name: "losses", type: "uint16" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     name: "rooms",
//     outputs: [
//       { internalType: "uint256", name: "roomId", type: "uint256" },
//       { internalType: "uint256", name: "lastMoveBlock", type: "uint256" },
//       { internalType: "address", name: "blackPlayer", type: "address" },
//       { internalType: "address", name: "whitePlayer", type: "address" },
//       {
//         internalType: "enum Gomoku.Position",
//         name: "currentPlayer",
//         type: "uint8",
//       },
//       { internalType: "uint8", name: "moveCount", type: "uint8" },
//       {
//         internalType: "enum Gomoku.GameState",
//         name: "gameState",
//         type: "uint8",
//       },
//       { internalType: "address", name: "winner", type: "address" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
// const contract = new ethers.Contract(contractAddress, abi, wallet);

// contract.on("testMain", (message) => {
//   console.log("Received testMain event:", message);
// });

// contract.on("testevent1", (value) => {
//   console.log("Received testevent1 event:", value.toString());
// });

// contract
//   .checkWin(2, [
//     [1, 5],
//     [1, 6],
//     [1, 7],
//     [1, 8],
//     [1, 9],
//   ])
//   .then((result) => {
//     result.wait();
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// contract.on("GameEnded", (msg) => {
//   console.log(`GameEnded Event: ${msg}`);
// });

(async () => {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    "4r5jiJycaq-CoV8_cLXyJ_uCoyEqRsXP"
  );
  const wallet = new ethers.Wallet(
    "0x7de86b837c030dd022930e8aa26102140801e370267c39633e9a27a74d0dca6f",
    provider
  );
  const contractAddress = "0xAC99576AE56bA434168C18983c5541e8A8447A8A";
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "roomId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "winner",
          type: "address",
        },
      ],
      name: "GameEnded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "roomId",
          type: "uint256",
        },
      ],
      name: "GameReset",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "roomId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "blackPlayer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "whitePlayer",
          type: "address",
        },
      ],
      name: "GameStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "roomId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum Gomoku.Position",
          name: "position",
          type: "uint8",
        },
        { indexed: false, internalType: "uint256", name: "x", type: "uint256" },
        { indexed: false, internalType: "uint256", name: "y", type: "uint256" },
      ],
      name: "MoveMade",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "roomId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "player",
          type: "address",
        },
      ],
      name: "PlayerLeft",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "roomId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "player",
          type: "address",
        },
        {
          indexed: false,
          internalType: "enum Gomoku.Position",
          name: "position",
          type: "uint8",
        },
      ],
      name: "RoomCreated",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "roomId", type: "uint256" },
        { internalType: "uint256[][]", name: "list", type: "uint256[][]" },
      ],
      name: "checkWin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum Gomoku.Position",
          name: "position",
          type: "uint8",
        },
      ],
      name: "createRoom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "roomId", type: "uint256" }],
      name: "joinRoom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "roomId", type: "uint256" },
        { internalType: "uint8", name: "x", type: "uint8" },
        { internalType: "uint8", name: "y", type: "uint8" },
      ],
      name: "makeMove",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "nextRoomId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "players",
      outputs: [
        { internalType: "address", name: "addr", type: "address" },
        { internalType: "uint16", name: "wins", type: "uint16" },
        { internalType: "uint16", name: "losses", type: "uint16" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "rooms",
      outputs: [
        { internalType: "uint256", name: "roomId", type: "uint256" },
        { internalType: "uint256", name: "lastMoveBlock", type: "uint256" },
        { internalType: "address", name: "blackPlayer", type: "address" },
        { internalType: "address", name: "whitePlayer", type: "address" },
        {
          internalType: "enum Gomoku.Position",
          name: "currentPlayer",
          type: "uint8",
        },
        { internalType: "uint8", name: "moveCount", type: "uint8" },
        {
          internalType: "enum Gomoku.GameState",
          name: "gameState",
          type: "uint8",
        },
        { internalType: "address", name: "winner", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const tx = await contract.checkWin(2, [
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
  ]);

  await tx.wait();

  contract.on("GameEnded", (msg) => {
    console.log(`GameEnded Event: ${msg}`);
  });
})();
